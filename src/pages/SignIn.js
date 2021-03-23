import React from "react";

import SignInForm from "../components/SignInForm";
import Navbar from "../components/Navbar";

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
