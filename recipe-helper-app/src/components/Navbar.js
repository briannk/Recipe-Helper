import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useGlobalContext } from "../context";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import { TiThMenu, TiThMenuOutline } from "react-icons/ti";

const Navbar = () => {
  const { user } = useGlobalContext();

  const [showNav, setShowNav] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleClick = () => {
    showNav ? setShowNav(false) : setShowNav(true);
  };

  return (
    <nav>
      <div className="nav-toggle">
        <button
          className="nav-toggle-button"
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
            <TiThMenu size={42} color={"rgb(111, 245, 207)"} />
          ) : (
            <TiThMenuOutline size={42} color={"rgb(111, 245, 207)"} />
          )}
        </button>
      </div>
      <div className={showNav ? "nav-container" : "nav-container hide-nav"}>
        <div className="nav-content">
          <div>
            <Link to="/">
              {/* <img src={logo} alt="Recipe Helper Logo"></img> */}
            </Link>
            <ul className="nav-links">
              <li>
                <Link to="/">
                  <button onClick={() => setShowNav(false)}>Home</button>
                </Link>
              </li>
              <li>
                <Link to="/recipes">
                  <button onClick={() => setShowNav(false)}>Recipes</button>
                </Link>
              </li>
              <li>
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

export default Navbar;
