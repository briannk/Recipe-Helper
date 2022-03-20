import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import "../stylesheets/Recipe.css";

const SearchBar = () => {
  const [recipes, setRecipes] = useState();

  const { getToken } = useGlobalContext();

  const searchRef = useRef(null);
  let timeout = null;

  let deferredSearch = (e) => {
    // initiate search after 1 second
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(async () => {
      await getRecipes();
    }, 1000);
  };

  let getRecipes = async () => {
    if (searchRef.current.value === "") {
      setRecipes(null);
      return;
    }

    const token = await getToken();
    const resp = await fetch(
      `http://localhost:5000/api/v1/recipes?searchTerm=${searchRef.current.value}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const results = await resp.json();
    console.log(results.payload);
    if (results && results.payload.recipes.length === 0) {
      setRecipes([{ name: "No recipe found.", _id: "" }]);
    } else {
      setRecipes(results.payload.recipes);
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
      <form action="">
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
