import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import "../stylesheets/Recipe.css";

const Message = ({ type, content }) => {
  const { message, setMessage } = useGlobalContext();
  const [showMessage, setShowMessage] = useState(true);
  // let css;

  const closeButton = () => {
    setShowMessage(false);
    setMessage(null);
  };

  let messageElem = (
    <div
      className={`message ${message.type === "notify" ? "notify" : "error"}`}
    >
      <p>
        <b>{message.content}</b>
      </p>
      <button className={"closeMessage"} onClick={closeButton}>
        <img
          className={"closeMessageImg"}
          src="/assets/x.png"
          alt="Close Alert"
        />
      </button>
    </div>
  );

  let timeout = null;

  useEffect(() => {
    // automatically close message after 5 seconds
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    timeout = setTimeout(closeButton, 5000);
  }, [message]);

  return <>{showMessage && messageElem}</>;
};

export default Message;
