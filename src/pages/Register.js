import React from "react";

import RegisterForm from "../components/RegisterForm";
import Navbar from "../components/Navbar";

function Register() {
  return (
    <>
      <Navbar />
      <div className="register">
        <RegisterForm />
      </div>
    </>
  );
}

export default Register;
