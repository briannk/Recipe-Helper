import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RecipeImg from "./RecipeImg";
import "../../stylesheets/Recipe.css";
import { useGlobalContext } from "../../context";
import RecipeIngredients from "./RecipeIngredients";
import RecipeName from "./RecipeName";
import RecipeDescription from "./RecipeDescription";
import RecipeTime from "./RecipeTime";
import RecipeServings from "./RecipeServings";
import RecipeDirections from "./RecipeDirections";
import RecipeTags from "./RecipeTags";
import { v4 as uuidv4 } from "uuid";

const defaultRecipe = {
  _id: "",
  author: "",
  name: "",
  tags: {},
  description: "",
  imagePath: "",
  time: "",
  servings: "",
  ingredients: {},
  directions: {},
  visibility: "PUBLIC",
};

const Recipe = () => {
  const { _id } = useParams();

  // ingredients and directions are objects rather than arrays
  // so that each item can be keyed with a uuid to comply with
  // react list key requirement
  // once the recipe is ready to upload, the object can be coerced
  // into an array as the uuid's are only neccessary for react

  const [recipe, setRecipe] = useState(defaultRecipe);
  const [isLoading, setIsLoading] = useState(true);

  const { getToken } = useGlobalContext();

  console.log(recipe);

  const arrToObj = (arr) => {
    let obj = {};
    let uuid;
    arr.forEach((val) => {
      uuid = uuidv4();
      obj[uuid] = val;
    });
    return obj;
  };

  const RecipeComponent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (recipe.visibility === "private") {
      return;
    }
    return (
      <div className="md:container font-mono p-2 md:p-4 bg-amber-50">
        <RecipeImg path={recipe.imagePath} />

        <div className="my-8">
          <RecipeName name={recipe.name} />
          <span className="p-2">{recipe.author || "No author provided"}</span>

          <RecipeTags tagsList={recipe.tags} />

          <RecipeDescription description={recipe.description} />

          <div className="recipe-prep-info flex gap-2 flex-col sm:flex-row sm:w-full">
            <RecipeServings servings={recipe.servings} />
            <RecipeTime time={recipe.time} />
          </div>

          <RecipeIngredients ingredientsList={recipe.ingredients} />
          <RecipeDirections directionsList={recipe.directions} />

          {recipe._id.startsWith("recipe_") ? null : (
            // The edamam api terms recently updated prohibiting caching
            // or copying of the data queried
            <Link
              to={{
                pathname: "/create",
                state: {
                  recipe: recipe,
                },
              }}
            >
              <button
                type="button"
                className="border border-2 rounded border-orange-300 p-4 my-4 hover:bg-orange-300/70 hover:text-white transition-all duration-200"
              >
                Edit Recipe
              </button>
            </Link>
          )}
          {recipe.url && (
            <div className="mt-8 p-2 text-slate-500">
              NOTE: Any missing info might be found at: {recipe.url}
            </div>
          )}
        </div>
      </div>

      // add RecipeNotes component for misc. info
    );
  };

  useEffect(() => {
    async function getRecipe() {
      const token = await getToken();
      const resp = await fetch(
        `http://localhost:5000/api/v1/recipes/recipe/${_id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const result = await resp.json();

      // convert array values into objects to allow each elem
      // to be keyed with a uuid to be used as keys in lists
      let recipe = result.payload.recipe;
      for (let key in recipe) {
        if (Array.isArray(recipe[key])) {
          recipe[key] = arrToObj(recipe[key]);
        }
      }

      setRecipe({ ...defaultRecipe, ...recipe });
    }

    try {
      setIsLoading(true);
      getRecipe();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [_id]);

  return <RecipeComponent />;
};

export default Recipe;
