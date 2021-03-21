import React from "react";
import "./SignIn.scss";

import SignInForm from "../../components/SignInForm/SignInForm";
import Navbar from "../../components/Navbar/Navbar";

function SignIn() {
  return (
    <>
      <Navbar />
      <div className="signIn">
        <SignInForm />
      </div>
    </>
  );
}

export default SignIn;
