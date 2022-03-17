import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { Link, useHistory } from "react-router-dom";
import { TiImage, TiCog } from "react-icons/ti";
// import context for current logged in user

const UserCard = () => {
  const { user, signOut, setMessage } = useGlobalContext();
  const history = useHistory();
  console.log(user.email);

  const [edit, setEdit] = useState(false);

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
      <div className="user-card">
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
    );
  } else card = <Link to="/signin">Sign In</Link>;

  return <>{card}</>;
};

export default UserCard;
