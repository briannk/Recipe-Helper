//  if recipe isnt available, use placeholders for easier input validation
// refactor ingredients into own component
// refactor inputs to follow controlled components pattern
import React, { useState, useReducer } from "react";
import { useHistory, useLocation } from "react-router-dom";
import RecipeImg from "./recipe/RecipeImg";
import data from "./data";
import "../stylesheets/Recipe.css";
import { useGlobalContext } from "../context";
import recipeReducer from "./recipe/recipeReducer";
import RecipeIngredients from "./recipe/RecipeIngredients";
import RecipeName from "./recipe/RecipeName";
import Message from "./Message";
import RecipeDescription from "./recipe/RecipeDescription";
import RecipeTime from "./recipe/RecipeTime";
import RecipeServings from "./recipe/RecipeServings";
import RecipeDirections from "./recipe/RecipeDirections";
import RecipeTags from "./recipe/RecipeTags";

const Create = () => {
  const { user, getToken, message, setMessage } = useGlobalContext();
  const history = useHistory();

  const location = useLocation();

  let initialRecipe = {
    _id: -1,
    author: user.email,
    name: "",
    tags: [],
    description: "",
    imagePath: "",
    time: "",
    servings: "",
    ingredients: [],
    directions: [],
    visibility: "PUBLIC",
    error: [],
  };

  if (location.state && Object.keys(location.state).length > 0) {
    initialRecipe = {
      ...initialRecipe,
      ...location.state.recipe,
    };
  }

  const [recipe, dispatch] = useReducer(recipeReducer, initialRecipe);
  const [messageElem, setMessageElem] = useState();
  const [showModal, setShowModal] = useState(false);

  let updateRecipe = (dispatchObj) => {
    dispatch(dispatchObj);
    console.log("recipe after update:", recipe);
  };

  let saveRecipe = async () => {
    console.log(recipe);
    // sanitize inputs
    if (recipe.error && recipe.error.length > 0) {
      recipe.error.forEach((node) => {
        node.classList.add("input-error");
      });
      console.log("Empty field exists");
      setMessage({ type: "error", content: "Please fill every field." });
      return;
    }
    delete recipe.error;

    console.log(typeof recipe._id);
    console.log(recipe._id === -1);
    // TO-DO: upload image to cdn
    const token = await getToken();
    let resp = await fetch(
      `http://localhost:5000/api/v1/recipes/recipe${
        recipe._id === -1 ? "" : "/" + recipe._id
      }`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      }
    );
    resp = await resp.json();

    // redirect to recipe page to see created/updated recipe
    // setMessage({ type: "notify", content: resp.payload.message });
    history.push(`/recipes/${resp.payload._id}`);
  };

  let deleteRecipe = async () => {
    // confirm deletion

    const token = await getToken();
    let resp = await fetch(`http://localhost:5000/api/v1/recipes/recipe`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    resp = await resp.json();
    console.log(resp);
  };

  let recipeElem;
  if (!recipe) {
    recipeElem = <div>Loading...</div>;
  } else {
    recipeElem = (
      <div className="md:container font-mono p-2 md:p-4 bg-amber-50">
        <form action="">
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
          <div className="recipe-prep-info flex gap-2 flex-col sm:flex-row sm:w-full">
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

          <div className="flex items-center gap-2 p-2">
            <input
              type="checkbox"
              id="checkbox"
              checked={recipe.visibility === "PUBLIC" ? true : false}
              onChange={(e) => {
                console.log(e.target.checked);
                updateRecipe({
                  type: "SET_VISIBILITY",
                  payload: { value: e.target.checked },
                });
              }}
              className="cursor-pointer"
            />
            <label htmlFor="checkbox" className="cursor-pointer">
              Publish Recipe?
            </label>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={saveRecipe}
              className="border border-2 rounded border-orange-300 p-4 my-4 hover:bg-orange-300/70 hover:text-white transition-all duration-200"
            >
              Save Recipe
            </button>
            {recipe._id !== -1 && (
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="border border-2 rounded border-red-300 p-4 my-4 hover:bg-red-300/70 hover:text-white transition-all duration-200"
              >
                Delete Recipe
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      {message && <Message />}
      {showModal && (
        <div
          className="w-screen h-screen fixed top-0 bg-black/50 flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full m-4 md:w-fit border-4 rounded border-white p-8 flex flex-col bg-white/30"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span className="text-3xl font-medium text-white mb-8">
              Are you sure you want to delete this recipe?
            </span>
            <button
              type="button"
              onClick={() => {
                deleteRecipe();
                setShowModal(false);
              }}
              className="border-4 rounded border-red-300 p-4 my-2 hover:bg-red-300/70 text-white transition-all duration-200 text-xl hover:font-medium"
            >
              Delete Recipe
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="border-4 rounded border-gray-300 p-4 my-2 hover:bg-gray-300/70 hover:text-white transition-all duration-200 text-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {recipeElem}
    </>
  );
};

export default Create;
