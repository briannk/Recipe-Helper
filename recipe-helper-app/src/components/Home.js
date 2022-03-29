import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import "../stylesheets/Home.css";
import RecipesRecent from "./RecipesRecent";

const containerStyles = "container h-screen font-mono p-2 md:p-4 bg-amber-50";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const { getToken, user } = useGlobalContext();

  // simply getting recipes from a list but change
  // after api is implemented
  const getRecentRecipes = async () => {
    const token = await getToken();
    const resp = await fetch(
      `http://localhost:5000/api/v1/users/recentRecipes`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const result = await resp.json();
    console.log(result);
    result.payload.history.sort((a, b) => b.viewedAt - a.viewedAt);
    setRecipes(result.payload.history);
  };

  useEffect(() => {
    getRecentRecipes();
  }, []);

  return (
    <main className={containerStyles}>
      {/* <RecipeImg /> */}
      {/* <header>
        <h1>Recent Recipes</h1>
      </header> */}
      <RecipesRecent recipes={recipes} />
    </main>
  );
};

export default Home;
