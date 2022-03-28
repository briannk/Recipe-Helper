import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import UserCard from "./user/UserCard";
import logo from "../assets/recipe-helper-icon.svg";

const liStyles = "rounded p-4 px-6 hover:bg-orange-300 text-white text-3xl";

const NavbarFull = () => {
  return (
    <nav>
      <div className="w-full h-32 bg-orange-200 flex flex-row justify-center z-50">
        <div className="w-full flex flex-row justify-between">
          <Link to="/">
            <img
              src={logo}
              alt="Recipe Helper Logo"
              className="h-32 ml-4 object-contain"
            />
          </Link>
          <ul className="w-1/3 flex justify-around lg:justify-around xl:gap-8 items-center">
            <Link to="/">
              <li className={liStyles}>Home</li>
            </Link>
            <Link to="/recipes">
              <li className={liStyles}>Recipes</li>
            </Link>

            <Link to="/create">
              <li className={liStyles}>Create</li>
            </Link>
          </ul>
          <div className="w-1/3 flex flex-col justify-center content-center">
            <SearchBar />
          </div>
        </div>
        {/* <div className="w-1/6"> */}
        <UserCard />
        {/* </div> */}
      </div>
    </nav>
  );
};

export default NavbarFull;
