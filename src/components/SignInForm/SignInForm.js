import React, { useRef } from "react";
import "./SignInForm.scss";

import { auth } from "../../firebase";
import { Link, useHistory } from "react-router-dom";

function SignInForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then(() => {
        history.push("/");
      })
      .catch(() => alert("Please create an account"));
  };

  return (
    <div className="signInForm">
      <form className="signInDetail">
        <h1>Sign In</h1>
        <div className="field">
          <label htmlFor="">Email</label>
          <input ref={emailRef} type="email" />
        </div>
        <div className="field">
          <label htmlFor="">Password</label>
          <input ref={passwordRef} type="password" />
        </div>
        <button onClick={signIn} type="submit">Sign In</button>

        <div className="signInDetail__bottom">
          <p>Dont have an Account ?</p>
          <Link to="/register">
            <span className="signInDetail__bottom--link">Register</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
