import React from "react";
import Navbar from "../components/Navbar";

import { useHistory } from "react-router-dom";

function ErrorPage() {
  const history = useHistory();
  return (
    <>
      <Navbar />
      <div className="errorPage">
        <h1>Dear Guest</h1>
        <h2>Please make an account to Proceed </h2>
        <div className="errorPage__btnGrp">
          <button
            onClick={() => history.push("./signin")}
            className="errorPage__btnGrp--login"
          >
            Sign In
          </button>
          <button
            onClick={() => history.push("./register")}
            className="errorPage__btnGrp--register"
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
