import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RecipeImg from "./RecipeImg";
import data from "../data";
import "../../stylesheets/Recipe.css";
import { useGlobalContext } from "../../context";
import RecipeIngredients from "./RecipeIngredients";
import RecipeName from "./RecipeName";
import RecipeDescription from "./RecipeDescription";
import RecipeTime from "./RecipeTime";
import RecipeServings from "./RecipeServings";
import RecipeDirections from "./RecipeDirections";
import RecipeTags from "./RecipeTags";

const Recipe = () => {
  const { _id } = useParams();
  // const { user } = useGlobalContext();

  const defaultRecipe = {
    _id: "",
    author: "",
    name: "",
    tags: [],
    description: "",
    imagePath: "",
    time: "",
    servings: "",
    ingredients: [],
    directions: [],
    visibility: "PUBLIC",
  };

  const [recipe, setRecipe] = useState(defaultRecipe);
  const [isLoading, setIsLoading] = useState(true);

  const { getToken } = useGlobalContext();

  console.log(recipe);

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
          {/* <h2>{recipe.author}</h2> */}
          <span className="p-2">{recipe.author || "No author provided"}</span>

          <RecipeTags tagsList={recipe.tags} />

          <RecipeDescription description={recipe.description} />

          <div className="recipe-prep-info">
            <RecipeServings servings={recipe.servings} />
            <RecipeTime time={recipe.time} />
          </div>

          <RecipeIngredients ingredientsList={recipe.ingredients} />
          <RecipeDirections directionsList={recipe.directions} />

          {recipe._id.startsWith("recipe_") ? null : (
            <button type="button" className="p-4">
              {
                // The edamam api terms recently updated prohibiting caching
                // or copying of the data queried
              }

              <Link
                to={{
                  pathname: "/create",
                  state: {
                    recipe: recipe,
                  },
                }}
              >
                Edit Recipe
              </Link>
            </button>
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
      console.log(result);
      setRecipe({ ...defaultRecipe, ...result.payload.recipe });
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
