import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useGlobalContext } from "../context";
import Message from "../components/Message";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const history = useHistory();

  const { signUp, loading, setLoading, message, setMessage } =
    useGlobalContext();

  console.log(loading, message);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      if (passwordRef.current.value.length > 6) {
        setMessage({
          type: "error",
          contents: "Password must be at least 6 characters.",
        });
      }
      setMessage({
        type: "error",
        contents: "Passwords do not match! Please check and try again.",
      });
      return;
    }

    try {
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      setMessage({
        type: "notify",
        content: "Sign Up successful! Redirecting to sign in page...",
      });
      setTimeout(() => {
        history.push("/");
      }, 3000);
    } catch {
      setMessage({
        type: "error",
        content: "Sign up failed. Please try again.",
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
        <input
          type="password"
          ref={passwordConfirmRef}
          placeholder="Confirm Password"
        />
        <button disabled={loading} type="submit">
          Sign Up
        </button>
      </form>
      <div>
        Already have an account? <Link to="/SignIn">Sign In.</Link>
      </div>
    </>
  );
};

export default SignUp;
