import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/Recipe.css";

const RecipeCard = ({ recipe }) => {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <Link
      to={`/recipes/${recipe._id || recipe.recipeId}`}
      className="w-full h-full flex justify-center"
    >
      <div
        className={`shadow hidden sm:flex justify-center items-center relative h-full border rounded ${
          showDesc ? "border-gray-800/50" : "border-gray-500/20"
        } w-full overflow-hidden`}
        onMouseEnter={() => {
          setShowDesc(true);
        }}
        onMouseLeave={() => {
          setShowDesc(false);
        }}
      >
        <img
          src={`${recipe.imagePath}` || "/assets/placeholder.png"}
          alt={`${recipe.name}`}
          className="w-full h-full object-cover absolute"
        />
        <div
          className={`w-3/4 h-1/3 flex justify-center items-center z-10 border border-gray-500/50 bg-gray-500/30 backdrop-filter backdrop-blur-xl backdrop-brightness-110 ${
            showDesc ? "opacity-0" : "opacity-100"
          } transition-all duration-500`}
        >
          <span className="text-2xl font-semibold">{recipe.name}</span>
        </div>
        <div
          className={`w-full h-full absolute flex bg-gray-700/50 ${
            showDesc ? "opacity-100" : "opacity-0"
          } justify-center items-center z-20 transition-all duration-500`}
        >
          <p
            className={`${
              showDesc
                ? "opacity-100 -translate-y-0"
                : "opacity-0 translate-y-4"
            } transition-all duration-500 text-xl text-white w-full h-full p-6 flex justify-center items-center text-ellipsis`}
          >
            {recipe.description}
          </p>
          {/* {consider adding other tidbits of info like time and tags} */}
        </div>
      </div>
      <div className="recipe-card sm:hidden justify-center items-center z-10 bg-gray-500/50 shadow">
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
