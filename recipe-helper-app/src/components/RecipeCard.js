import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Recipe.css";

const RecipeCard = ({ recipe }) => {
  console.log(recipe);
  return (
    <Link to={`/recipes/${recipe._id}`}>
      <div className="recipe-card">
        <div className="recipe-card-name">{recipe.name}</div>
        <img
          src={`${recipe.imagePath}` || "/assets/placeholder.png"}
          alt={`${recipe.name}`}
        />
      </div>
    </Link>
  );
};

export default RecipeCard;
