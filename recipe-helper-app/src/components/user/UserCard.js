import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { Link, useHistory } from "react-router-dom";
import { TiImage, TiCog } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";
// import context for current logged in user

const UserCard = () => {
  const { user, signOut, setMessage } = useGlobalContext();
  const history = useHistory();

  const [edit, setEdit] = useState(false);
  const [showCard, setShowCard] = useState();

  const handleLogOut = async () => {
    try {
      await signOut();
      setMessage({
        type: "notify",
        content: "Successfully signed out.",
      });
      history.push("/login");
    } catch {
      setMessage({
        type: "error",
        content: "Sign out failed.",
      });
    }
  };

  let card;

  if (user) {
    card = (
      <>
        <div className="hidden lg:flex h-full p-4 content-center">
          <div className="user-photo-window ">
            <img src="/assets/placeholder.png" alt="" className="user-photo" />
          </div>
          <div className="flex flex-col h-full justify-around items-center">
            <button onClick={handleLogOut}>
              <FiLogOut color="white" size={28} />
            </button>
            <Link
              to={{
                pathname: "/settings",
              }}
            >
              <TiCog color="white" size={32} />
            </Link>
          </div>
        </div>

        <div className="block lg:hidden user-card">
          <p>Currently logged in as:</p>
          <div
            className="user-photo-window"
            onMouseEnter={() => {
              setEdit(true);
            }}
            onMouseLeave={() => {
              setEdit(false);
            }}
          >
            <img src="/assets/placeholder.png" alt="" className="user-photo" />
            {edit && <TiImage className="edit-photo" size={42} />}
          </div>
          {user.email}
          <Link
            to={{
              pathname: "/settings",
            }}
          >
            <TiCog className="button-settings" />
          </Link>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      </>
    );
  } else card = <Link to="/signin">Sign In</Link>;

  return <>{card}</>;
};

export default UserCard;
