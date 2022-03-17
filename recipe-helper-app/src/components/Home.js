import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
// import RecipeImg from "../components/RecipeImg";
import "../stylesheets/Home.css";

const Home = () => {
  const { user } = useGlobalContext();

  // simply getting recipes from a list but change
  // after api is implemented
  function getUserRecipes() {
    return;
  }

  console.log("user info: ", user);

  useEffect(() => {
    getUserRecipes();
  }, []);

  return (
    <main className="home-container">
      {/* <RecipeImg /> */}
      <header>
        <h1>Recent Recipes</h1>
        <img src="" alt="" className="recent-icon" />
      </header>
    </main>
  );
};

export default Home;
