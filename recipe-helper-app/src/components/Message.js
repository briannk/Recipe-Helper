import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import "../stylesheets/Recipe.css";

const Message = ({ type, content }) => {
  const { message, setMessage } = useGlobalContext();
  const [showMessage, setShowMessage] = useState(true);
  // let css;
  console.log("message");

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

  // const displayMessage = () => {
  //   // if (messageContent.type === "notify") {
  //   //   //   image = ""
  //   //   css = "background-color:rgb(153, 255, 153);";
  //   // } else if (messageContent.type === "error") {
  //   //   css = "background-color:rgb(255, 153, 153);";
  //   // }

  //   setShowMessage(true);
  //   return (
  //     <div>
  //       <p className={type === "notify" ? "notify" : "error"}>{content}</p>
  //       <button onClick={closeButton}></button>
  //     </div>
  //   );
  // };

  // useEffect(() => {
  //   if (type && content) {
  //     setShowMessage(true);
  //   }
  // }, []);

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
  // return <>{messageElem}</>;
};

export default Message;
