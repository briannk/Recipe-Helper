import React from "react";
import { Link } from "react-router-dom";
import isEmpty from "lodash.isempty";
import RecipeCard from "./recipe/RecipeCard";

const RecipesList = ({ recipes }) => {
  return (
    <ol className="w-full lg:w-1/3 h-full flex flex-col overflow-auto ">
      {recipes.map((recipe) => {
        return (
          <li key={recipe.recipeId} className="h-32 shrink-0">
            <RecipeCard recipe={recipe} />
          </li>
        );
      })}
    </ol>
  );
};

const FeaturedRecipe = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe.recipeId}`} className="w-full lg:w-2/3 h-full">
      <div className="relative w-full h-full">
        <img
          src={`${recipe.imagePath}` || "/assets/placeholder.png"}
          alt={`${recipe.name}`}
          className="w-full h-full object-cover absolute"
        />
        <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-gray-500 to-gray-700/10 hover:from-gray-600 hover:to-gray-800/10 flex flex-col justify-center items-end px-8 gap-2">
          <span className="w-fit text-2xl text-white/90">{recipe.name}</span>
          <p className="text-white/80">{recipe.description}</p>
        </div>
      </div>
    </Link>
  );
};

const containerStyles = "w-full h-full font-mono p-2 md:p-4 bg-amber-50";
const outerStyles = "w-full h-full lg:h-96 shadow-lg flex flex-col lg:flex-row";

const RecipesRecent = ({ recipes }) => {
  console.log(recipes);
  const [featured, ...rest] = recipes;
  console.log(featured);
  return isEmpty(recipes) ? (
    <div>No Recipes!</div>
  ) : (
    <div className={containerStyles}>
      <div className={outerStyles}>
        <FeaturedRecipe recipe={featured} />
        <RecipesList recipes={rest} />
      </div>
    </div>
  );
};

export default RecipesRecent;
