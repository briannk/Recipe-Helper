import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Recipe.css";

const SearchBar = () => {
  const [recipes, setRecipes] = useState();
  // const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);
  let timeout = null;

  let deferredSearch = (e) => {
    // initiate search after 1 second
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(async () => {
      // setSearchTerm(searc);
      console.log(searchRef.current.value);
      console.log("doing search");
      await getRecipes();
    }, 1000);
  };

  let getRecipes = async () => {
    if (searchRef.current.value === "") {
      setRecipes(null);
      return;
    }
    const resp = await fetch("http://localhost:5000/api/v1/recipes", {
      method: "GET",
      // headers: {
      //   Authorization: "Bearer " + token,
      // },
      headers: {
        searchTerm: searchRef.current.value,
      },
    });
    console.log(searchRef.current.value);
    const results = await resp.json();
    console.log(results);
    // return results.payload;
    if (results && results.payload.recipeData.recipes.length === 0) {
      setRecipes([{ name: "No recipe found.", _id: "" }]);
    } else {
      setRecipes(results.payload.recipeData.recipes);
    }
  };

  let searchResults = recipes ? (
    <ul className="searchResults">
      {recipes &&
        recipes.map((recipe, index) => (
          <li key={index}>
            <Link
              to={`/recipes/${recipe._id}`}
              onClick={() => {
                setRecipes(0);
                // window.location.reload();
              }}
            >
              {recipe.name}
            </Link>
          </li>
        ))}
    </ul>
  ) : null;

  return (
    <div className="searchBar">
      <form action="http://localhost:3000/recipes">
        <input
          type="text"
          ref={searchRef}
          placeholder="Look up a recipe..."
          name="search"
          onChange={deferredSearch}
        />
      </form>
      {searchResults}
    </div>
  );
};

export default SearchBar;
