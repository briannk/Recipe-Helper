import { v4 as uuidv4 } from "uuid";

// TO-DO: extract error array logic into functions and add respective
// function calls in each case
// ex. all set cases should check for empty target value and add
// the input node to the error array if true or remove if false,
// and all remove cases should simply remove the target input from
// the error array

// functions to handle error array
function checkError(state, node, action) {
  if (node === "") {
    if (!state.error.includes(node)) {
      state.error.push(action.payload.event.target);
    }
  }
  return state;
}

function removeError(state, node) {
  if (state.error?.includes(node)) {
    let index = state.error.indexOf(node);
    state.error = [
      ...state.error.slice(0, index),
      ...state.error.slice(index + 1),
    ];
    node.classList.remove("input-error");
  }
  return state;
}

const recipeReducer = (state, action) => {
  let newState = { ...state };
  // if (action.payload.target) {
  //   if (action.payload.event.target.value === "") {
  //     if (!newState.error.includes(action.payload.event.target)) {
  //       newState.error.push(action.payload.event.target);
  //       console.log("pushin");
  //     }
  //     console.log(newState);
  //   } else {
  //     if (newState.error?.includes(action.payload.target)) {
  //       let index = newState.error.indexOf(action.payload.target);
  //       newState.error = [
  //         ...newState.error.slice(0, index),
  //         ...newState.error.slice(index + 1),
  //       ];
  //       console.log("poppin");
  //       console.log(newState);
  //       console.log(action.payload.event.target.value);
  //     }
  //     console.log("value ", action.payload.event.target.value);
  //     action.payload.event.target.classList.remove("input-error");
  //   }
  // }
  let uuid = null;
  let removedProp;
  let newError;
  // newError = checkError(newState, action.payload.node);
  newError = [];
  newState = { ...newState, newError };

  switch (action.type) {
    // ************************************************************************
    // SETTING ACTIONS
    // ************************************************************************
    case "SET_NAME":
      newState["name"] = action.payload.value;
      break;
    case "SET_AUTHOR":
      newState["author"] = action.payload.value;
      break;
    case "SET_TAG":
      if (!action.payload.uuid) {
        uuid = uuidv4();
      } else {
        uuid = action.payload.uuid;
      }
      console.log("hit!");
      if (!action.payload.value) {
        newState = {
          ...newState,
          tags: { ...newState["tags"], [uuid]: "" },
        };
      } else {
        newState = {
          ...newState,
          tags: {
            ...newState["tags"],
            [uuid]: action.payload.value,
          },
        };
      }
      break;
    case "SET_DESCRIPTION":
      newState["description"] = action.payload.value;
      break;
    case "SET_SERVINGS":
      newState["servings"] = action.payload.value;
      break;
    case "SET_TIME":
      newState["time"] = action.payload.value;
      break;
    // case "SET_INGREDIENT_QUANTITY":
    //   newState["ingredients"][action.payload.listId] = {
    //     ...state["ingredients"][action.payload.listId],
    //   };
    //   if (!action.payload.event) {
    //     newState["ingredients"][action.payload.listId]["quantity"] = "";
    //   } else {
    //     newState["ingredients"][action.payload.listId]["quantity"] =
    //       action.payload.event.target.value;
    //   }

    //   break;
    // case "SET_INGREDIENT_ITEM":
    //   newState["ingredients"][action.payload.listId] = {
    //     ...state["ingredients"][action.payload.listId],
    //   };
    //   if (!action.payload.event) {
    //     newState["ingredients"][action.payload.listId]["ingredientName"] = "";
    //   } else {
    //     newState["ingredients"][action.payload.listId]["ingredientName"] =
    //       action.payload.event.target.value;
    //   }
    //   break;
    case "SET_INGREDIENT":
      if (!action.payload.uuid) {
        uuid = uuidv4();
      } else {
        uuid = action.payload.uuid;
      }
      console.log("hit!");
      if (!action.payload.value) {
        newState = {
          ...newState,
          ingredients: { ...newState["ingredients"], [uuid]: "" },
        };
      } else {
        newState = {
          ...newState,
          ingredients: {
            ...newState["ingredients"],
            [uuid]: action.payload.value,
          },
        };
      }
      break;
    case "SET_DIRECTION":
      if (!action.payload.uuid) {
        uuid = uuidv4();
      } else {
        uuid = action.payload.uuid;
      }
      console.log("hit!");
      // console.log({ ...newState["directions"] });
      if (!action.payload.value) {
        newState = {
          ...newState,
          directions: { ...newState["directions"], [uuid]: "" },
        };
      } else {
        newState = {
          ...newState,
          directions: {
            ...newState["directions"],
            [uuid]: action.payload.value,
          },
        };
      }
      break;
    case "SET_VISIBILITY":
      newState["visibility"] = action.payload.value ? "PUBLIC" : "PRIVATE";
      break;

    // ************************************************************************
    // REMOVING ACTIONS
    // ************************************************************************
    case "REMOVE_TAG":
      let tags;
      ({ [action.payload.uuid]: removedProp, ...tags } = newState["tags"]);
      newState = { ...newState, tags: tags };
      break;

    case "REMOVE_INGREDIENT":
      let ingredients;
      ({ [action.payload.uuid]: removedProp, ...ingredients } =
        newState["ingredients"]);
      newState = { ...newState, ingredients: ingredients };
      break;

    case "REMOVE_DIRECTION":
      let directions = {};
      ({ [action.payload.uuid]: removedProp, ...directions } =
        newState["directions"]);
      console.log(removedProp, directions);
      newState = { ...newState, directions: directions };
      break;

    default:
      console.log("no matching action in recipeReducer");
      break;
  }
  console.log("returning state: ", newState);
  return newState;
};

export default recipeReducer;
