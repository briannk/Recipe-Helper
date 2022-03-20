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
  let newError;
  newError = checkError(newState, action.payload.node);
  newState = { ...newState, newError };

  switch (action.type) {
    // ************************************************************************
    // SETTING ACTIONS
    // ************************************************************************
    case "SET_NAME":
      newState["name"] = action.payload.node.value;
      break;
    case "SET_AUTHOR":
      newState["author"] = action.payload;
      break;
    case "SET_TAG":
      if (!action.payload.node) {
        console.log("no event");
        console.log("listId being set ", action.payload.listId);
        newState["tags"][action.payload.listId] = "";
      } else {
        console.log("state before set ", newState);
        newState["tags"][action.payload.listId] = action.payload.node.value;
        console.log("state after set ", newState);
      }
      break;
    case "SET_DESCRIPTION":
      newState["description"] = action.payload.node.value;
      break;
    case "SET_SERVINGS":
      newState["servings"] = action.payload.node.value;
      break;
    case "SET_TIME":
      newState["time"] = action.payload.node.value;
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
      console.log("reducer");
      if (!action.payload.node) {
        console.log("no event");
        console.log("listId being set ", action.payload.listId);
        newState["ingredients"][action.payload.listId] = "";
      } else {
        console.log("state before set ", newState);
        newState["ingredients"][action.payload.listId] =
          action.payload.node.value;
        console.log("state after set ", newState);
      }
      break;
    case "SET_DIRECTION":
      if (!action.payload.node) {
        newState["directions"][action.payload.listId] = "";
      } else {
        console.log("state before set ", newState);
        newState["directions"][action.payload.listId] =
          action.payload.node.value;
        console.log("state after set ", newState);
      }
      break;
    case "SET_VISIBILITY":
      newState["visibility"] = action.payload.event.target.checked
        ? "PUBLIC"
        : "PRIVATE";
      break;

    // ************************************************************************
    // REMOVING ACTIONS
    // ************************************************************************
    case "REMOVE_TAG":
      console.log("removing tag ", action.payload.node);
      console.log("removing listId: ", action.payload.listId);
      removeError(newState, action);
      if (newState["tags"].length > action.payload.listId) {
        newState["tags"] = [
          ...newState["tags"].slice(0, action.payload.listId),
          ...newState["tags"].slice(action.payload.listId + 1),
        ];
      }

      break;

    case "REMOVE_INGREDIENT":
      console.log("removing ingredient ", action.payload.listId);
      console.log("removing listId: ", action.payload.listId);
      if (newState["ingredients"].length > action.payload.listId) {
        newState["ingredients"] = [
          ...newState["ingredients"].slice(0, action.payload.listId),
          ...newState["ingredients"].slice(action.payload.listId + 1),
        ];
      }
      break;

    case "REMOVE_DIRECTION":
      // TO-DO: splice does not reflect properly, look into newState immutability
      let foo = action.payload.listId;
      console.log("state before removal ", newState);
      if (newState["directions"].length > action.payload.listId) {
        console.log("removing direction ", foo);
        console.log("listId being removed ", action.payload.listId);
        // newState["directions"].splice(action.payload.listId, 1);
        newState["directions"] = [
          ...newState["directions"].slice(0, action.payload.listId),
          ...newState["directions"].slice(action.payload.listId + 1),
        ];
      }

      console.log("directions after removal ", newState["directions"]);
      console.log("state after removal ", newState);
      break;

    default:
      console.log("no matching action in recipeReducer");
      break;
  }
  console.log("returning state: ", newState);
  return newState;
};

export default recipeReducer;
