import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useGlobalContext } from "../context";
import Message from "../components/Message";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const { signIn, loading, setLoading, message, setMessage } =
    useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // setMessage({});
      await signIn(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setMessage({
        type: "error",
        content:
          "E-mail and password combination is incorrect. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {message && <Message />}
      <form action="" onSubmit={handleSubmit}>
        <input type="email" ref={emailRef} placeholder="E-mail" />
        <input type="password" ref={passwordRef} placeholder="Password" />

        <button disabled={loading} type="submit">
          Sign In
        </button>
      </form>
      <div>
        <Link to="/SignUp">Sign up</Link> for an account!
      </div>
    </>
  );
};
export default SignIn;
