import React, { useState, useEffect } from "react";
import data from "./data";
import RecipeCard from "./RecipeCard";
import { useGlobalContext } from "../context";
import Message from "./Message";

const Recipes = () => {
  const { getToken, setMessage } = useGlobalContext();

  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    try {
      const token = await getToken();
      console.log(window.location.search);
      const resp = await fetch(
        "http://localhost:5000/api/v1/recipes" + window.location.search,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("postcall");
      const recipeList = await resp.json();
      console.log(recipeList);
      return recipeList.payload.recipeData.recipes;
    } catch {}
  };

  let recipeList;
  if (recipes && recipes.length > 0) {
    recipeList = (
      <ul>
        {recipes.map((recipeEntry) => {
          return (
            <li key={recipeEntry._id}>
              <RecipeCard recipe={recipeEntry} />
            </li>
          );
        })}
      </ul>
    );
  } else {
    recipeList = null;
  }

  // useEffect(() => {
  //   const recipeList = getRecipes();
  //   setRecipes(recipeList);
  // }, []);

  useEffect(async () => {
    const data = await getRecipes();
    setRecipes(data);
    console.log(recipes);
  }, []);

  return (
    <div className="recipe-list">
      {/* <Message /> */}
      {recipeList}
      {/* {console.log(getRecipes())} */}
    </div>
  );
};

export default Recipes;
