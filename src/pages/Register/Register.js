import React from "react";
import "./Register.scss";

import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Navbar from "../../components/Navbar/Navbar";

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
