import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import "../stylesheets/Recipe.css";
import { ImSearch } from "react-icons/im";
import { VscClose } from "react-icons/vsc";

const liStyles = "text-orange-300 w-full h-full p-2 hover:bg-orange-100";

const SearchBar = () => {
  const [recipes, setRecipes] = useState();
  const [showResults, setShowResults] = useState(false);
  const [clear, setClear] = useState(false);

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
    setShowResults(true);
  };

  let searchResults = showResults && (
    <>
      {/* // use a transparent div to detect when a click occurs // outside of the
        search results */}
      <ul className="bg-white/80 absolute w-full buttom-0 p-4">
        {recipes &&
          recipes.map((recipe, index) => (
            <Link
              to={`/recipes/${recipe._id}`}
              onClick={() => {
                setRecipes(null);
                setShowResults(false);
              }}
              className="w-full h-full"
              key={index}
            >
              <li className={liStyles}>{recipe.name}</li>
            </Link>
          ))}
      </ul>
    </>
  );

  return (
    <div className="searchBar text-slate-600">
      {showResults && (
        <div
          onClick={() => setShowResults(false)}
          className="fixed top-0 left-0 w-screen h-screen border border-2 border-orange-200"
        ></div>
      )}
      <form
        action=""
        autoComplete="off"
        className="relative w-full justify-self-center"
        onMouseOver={() => searchRef.current.value && setClear(true)}
        onMouseOut={() => clear && setClear(false)}
      >
        <ImSearch
          className="absolute left-0 ml-4 h-full"
          size={24}
          color="gray"
        />
        <VscClose
          className={`${
            clear ? "block" : "hidden"
          } absolute right-0 mr-4 h-full cursor-pointer`}
          size={24}
          color="gray"
          onClick={() => {
            searchRef.current.value = "";
            setShowResults(false);
          }}
        />
        <input
          type="text"
          ref={searchRef}
          placeholder="Look up a recipe..."
          name="search"
          onChange={deferredSearch}
        />

        {searchResults}
      </form>
    </div>
  );
};

export default SearchBar;
