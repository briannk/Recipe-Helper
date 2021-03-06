import React, { useState, useEffect, useContext } from "react";
import { auth } from "./firebase";

const AppContext = React.createContext();

const useGlobalContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    // initialize with placeholder data maybe?
  });
  const [loading, setLoading] = useState(true);

  // object to store message and message type
  const [message, setMessage] = useState(null);

  const signOut = () => {
    return auth.signOut();
  };

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const getToken = async () => {
    console.log("getToken");
    return await auth.currentUser.getIdToken();
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsub;
  }, []);

  const providerValue = {
    loading,
    setLoading,
    user,
    setUser,
    signIn,
    signUp,
    message,
    setMessage,
    getToken,
    signOut,
  };

  return (
    <AppContext.Provider value={providerValue}>
      {loading ? "Loading..." : children}
    </AppContext.Provider>
  );
};

export { AppProvider as default, useGlobalContext };
