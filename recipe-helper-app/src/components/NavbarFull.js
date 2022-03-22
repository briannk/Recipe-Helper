import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import UserCard from "./user/UserCard";
import logo from "../assets/recipe-helper-icon.svg";

const liStyles = "rounded p-4 px-6 hover:bg-orange-300 text-white text-3xl";

const NavbarFull = () => {
  return (
    <nav className="">
      <div className="w-full h-32 bg-orange-200 flex flex-row justify-center">
        <div className="w-full flex flex-row justify-around">
          <Link to="/">
            <img
              src={logo}
              alt="Recipe Helper Logo"
              className="h-32 object-contain"
            />
          </Link>
          <ul className="w-1/3 flex justify-around lg:justify-around lg:gap-8 items-center">
            <li className={liStyles}>
              <Link to="/">Home</Link>
            </li>
            <li className={liStyles}>
              <Link to="/recipes">Recipes</Link>
            </li>
            <li className={liStyles}>
              <Link to="/create">Create</Link>
            </li>
          </ul>
          <div className="w-1/3 flex flex-col justify-center content-center">
            <SearchBar />
          </div>
        </div>
        <UserCard />
      </div>
    </nav>
  );
};

export default NavbarFull;
