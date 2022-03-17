//  if recipe isnt available, use placeholders for easier input validation
// refactor ingredients into own component
// refactor inputs to follow controlled components pattern
import React, { useState, useReducer } from "react";
import { useHistory, useLocation } from "react-router-dom";
import RecipeImg from "./RecipeImg";
import data from "./data";
import "../stylesheets/Recipe.css";
import { useGlobalContext } from "../context";
import recipeReducer from "./recipeReducer";
import RecipeIngredients from "./RecipeIngredients";
import RecipeName from "./RecipeName";
import Message from "./Message";
import RecipeDescription from "./RecipeDescription";
import RecipeTime from "./RecipeTime";
import RecipeServings from "./RecipeServings";
import RecipeDirections from "./RecipeDirections";
import RecipeTags from "./RecipeTags";

const Create = () => {
  const { user, getToken, message, setMessage } = useGlobalContext();
  const history = useHistory();
  // if there is no logged in user, redirect to login
  // if (!user) {
  //   setMessage({ type: "error", content: "You must be signed in to do this!" });
  //   history.push("/signin");
  // }

  console.log(user);

  const location = useLocation();
  // const [recipe, setRecipe] = useState();

  let initialRecipe;

  initialRecipe = {
    _id: -1,
    author: "",
    name: "",
    tags: [],
    description: "",
    imagePath: "",
    time: "",
    servings: "",
    ingredients: [],
    directions: [],
    visibility: "public",
    error: [],
  };

  if (location.state && Object.keys(location.state).length > 0) {
    // setRecipe(location.state.recipe);
    initialRecipe = { ...initialRecipe, ...location.state.recipe };
  } else {
    // setRecipe({});
  }

  const [recipe, dispatch] = useReducer(recipeReducer, initialRecipe);
  const [messageElem, setMessageElem] = useState();
  // console.log("recipe: ", recipe);

  let updateRecipe = (dispatchObj) => {
    dispatch(dispatchObj);
    console.log("recipe after update:", recipe);
  };

  let saveRecipe = async () => {
    // TO-DO: add a user_id field to the database in the recipes to be able to
    // get all recipes created by a user.
    // TO-DO: create a collection for user info such as display name
    // and keep the document updated at all times.
    console.log(user.email);
    // return;
    dispatch({ type: "SET_AUTHOR", payload: user.email });
    // sanitize inputs
    console.log("final state: ", recipe);
    if (recipe.error && recipe.error.length > 0) {
      recipe.error.forEach((node) => {
        node.classList.add("input-error");
      });
      console.log("Empty field exists");
      let messageObj = { type: "error", content: "Please fill every field." };
      setMessage({ type: "error", content: "Please fill every field." });
      return;
    }

    delete recipe.error;

    // TO-DO: upload image to cdn
    const token = await getToken();
    console.log(token);
    let resp = await fetch("http://localhost:5000/api/v1/saveRecipe", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    resp = await resp.json();
    console.log(resp);

    // redirect to recipe page to see created/updated recipe
    setMessage({ type: "notify", content: resp.payload.message });
    history.push(`/recipes/${resp.payload._id}`);
  };

  let deleteRecipe = async () => {
    console.log("deleting recipe");
    const token = await getToken();
    let resp = await fetch(
      "http://localhost:5000/api/v1/recipes/" + recipe._id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    resp = await resp.json();
    console.log(resp);
  };

  let deleteButton =
    recipe.id > -1 ? (
      <button type="button" onClick={deleteRecipe}>
        Delete Recipe
      </button>
    ) : null;

  let recipeElem;
  if (!recipe) {
    recipeElem = <div>Loading...</div>;
  } else {
    recipeElem = (
      <div className="container">
        <form action="" className="recipe-container">
          <RecipeImg path={recipe.imagePath} />
          <RecipeName
            name={recipe.name}
            handleUpdate={updateRecipe}
            toEdit={true}
          />
          <h2>{recipe.author}</h2>
          <RecipeTags
            tagsList={recipe.tags}
            handleUpdate={updateRecipe}
            toEdit={true}
          />
          <RecipeDescription
            description={recipe.description}
            handleUpdate={updateRecipe}
            toEdit={true}
          />
          <div className="recipe-prep-info">
            <RecipeTime
              time={recipe.time}
              handleUpdate={updateRecipe}
              toEdit={true}
            />
            <RecipeServings
              servings={recipe.servings}
              handleUpdate={updateRecipe}
              toEdit={true}
            />
          </div>
          <RecipeIngredients
            ingredientsList={recipe.ingredients}
            handleUpdate={updateRecipe}
            toEdit={true}
          />
          <RecipeDirections
            directionsList={recipe.directions}
            handleUpdate={updateRecipe}
            toEdit={true}
          />

          <input
            type="checkbox"
            id="checkbox"
            onClick={(e) => {
              updateRecipe({ type: "SET_VISIBILITY", payload: { event: e } });
            }}
          />
          <label htmlFor="checkbox">Publish Recipe?</label>
          <button type="button" onClick={saveRecipe}>
            Save Recipe
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      {message && <Message />}
      {recipeElem}
      {deleteButton}
    </>
  );
};

export default Create;
