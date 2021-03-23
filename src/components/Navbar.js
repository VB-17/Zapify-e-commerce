import React from "react";

import { useGlobalState } from "../StateProvider";

import { Link } from "react-router-dom";
import { auth } from "../firebase";

function Navbar({ isSticky = true }) {
  const [{ user }] = useGlobalState();

  return (
    <div
      className="navbar"
      style={{ position: `${isSticky ? "sticky" : "fixed"}` }}
    >
      <div className="navbar__container">
        <Link to="/" style={{ color: "white" }}>
          <h1>Zapify</h1>
        </Link>

        <ul className="navbar__links">
          <li>
            <Link style={{ color: "#adadad" }} to="/">
              Home
            </Link>{" "}
          </li>
          {user && (
            <li>
              <Link style={{ color: "#adadad" }} to="/cart">
                Cart
              </Link>{" "}
            </li>
          )}

          <li>
            <Link to="/register">
              <button
                style={{ display: `${user ? "none" : "block"}` }}
                className="signUp"
              >
                Register
              </button>
            </Link>
          </li>

          <li>
            {!user ? (
              <Link to="/signin">
                <button className="signIn">Sign In</button>
              </Link>
            ) : (
              <button onClick={() => auth.signOut()} className="signIn">
                Sign Out
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
