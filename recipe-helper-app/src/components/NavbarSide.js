import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import UserCard from "./user/UserCard";
import SearchBar from "./SearchBar";
import { TiThMenu, TiThMenuOutline } from "react-icons/ti";

const fontStyles = "text-slate-600";
const liStyles = "rounded p-4 px-6 hover:bg-orange-300 text-white text-3xl";

const NavbarSide = () => {
  const [showNav, setShowNav] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleClick = () => {
    showNav ? setShowNav(false) : setShowNav(true);
  };

  return (
    <nav>
      <button
        className="nav-toggle-button w-min"
        onClick={handleClick}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        {showNav ? (
          isHover ? (
            <TiThMenu size={42} color={"white"} />
          ) : (
            <TiThMenuOutline size={42} color={"white"} />
          )
        ) : isHover ? (
          <TiThMenu size={42} color={"rgb(253, 186, 116)"} />
        ) : (
          <TiThMenuOutline size={42} color={"rgb(253, 186, 116)"} />
        )}
      </button>
      <div className={showNav ? "nav-container" : "nav-container hide-nav"}>
        <div className="nav-content">
          <div>
            <Link to="/">
              {/* <img src={logo} alt="Recipe Helper Logo"></img> */}
            </Link>
            <ul className="nav-links">
              <li className={liStyles}>
                <Link to="/">
                  <button onClick={() => setShowNav(false)}>Home</button>
                </Link>
              </li>
              <li className={liStyles}>
                <Link to="/recipes">
                  <button onClick={() => setShowNav(false)}>Recipes</button>
                </Link>
              </li>
              <li className={liStyles}>
                <Link to="/create">
                  <button onClick={() => setShowNav(false)}>Create</button>
                </Link>
              </li>
            </ul>
            <SearchBar />
          </div>
          <UserCard />
        </div>
        {/* Since there are so few links, maybe make recipe and create
      have accompanying images */}
      </div>
    </nav>
  );
};

export default NavbarSide;
