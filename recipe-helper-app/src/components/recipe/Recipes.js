import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { useGlobalContext } from "../../context";
import Message from "../Message";

const Recipes = () => {
  const { getToken } = useGlobalContext();

  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    try {
      const token = await getToken();
      const resp = await fetch(
        `http://localhost:5000/api/v1/recipes${
          window.location.search ? `?searchTerm${window.location.search}` : ""
        }`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const recipeList = await resp.json();

      setRecipes(recipeList.payload.recipes);
    } catch (e) {
      console.log(e);
    }
  };

  const RecipeList = () => {
    if (recipes && recipes.length > 0) {
      return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:max-w-6xl w-full">
          {recipes.map((recipeEntry) => {
            return (
              <li key={recipeEntry._id} className="sm:h-72">
                <RecipeCard recipe={recipeEntry} />
              </li>
            );
          })}
        </ul>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="container p-2 md:p-4 bg-amber-50 flex justify-center">
      {/* <Message /> */}
      <RecipeList />
    </div>
  );
};

export default Recipes;
