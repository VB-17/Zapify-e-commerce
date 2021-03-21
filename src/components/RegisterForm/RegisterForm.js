import React, { useRef } from "react";
import "./RegisterForm.scss";

import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import { FcGoogle } from "react-icons/fc";

import { auth, provider } from "../../firebase";

function RegisterForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const history = useHistory();

  const googleSignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then(() => history.push("/"))
      .catch((err) => alert(err.message));
  };

  const register = (e) => {
    e.preventDefault();
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then(() => {
          history.push("/signin");
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="registerForm">
      <form className="registerForm__detail">
        <h1>Register</h1>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            ref={emailRef}
            // ref={email({pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})}
          />
        </div>
        <div className="field">
          <label htmlFor="">Password</label>
          <input ref={passwordRef} type="password" />
        </div>
        <div className="field">
          <label htmlFor="">Confirm Password</label>
          <input ref={confirmPasswordRef} type="password" />
        </div>
        <div className="registerForm__btnGrp">
          <button
            onClick={register}
            className="registerForm__btnGrp--register"
            type="submit"
          >
            Register
          </button>
          <h4 className="seperator">OR</h4>
          <button
            onClick={googleSignIn}
            className="registerForm__btnGrp--google"
          >
            <FcGoogle className="g-icon" /> Continue with Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
