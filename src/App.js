import React, { useEffect } from "react";
import "./styles/main.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { auth } from "./firebase";
import { useGlobalState } from "./contexts/StateProvider";

import { createUser } from "./utils/firebaseUtils";

import Home from "./pages/Home";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [{ user }, dispatch] = useGlobalState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        createUser(userAuth);
        dispatch({
          type: "SET_USER",
          user: { uid: userAuth.uid, email: userAuth.email },
        });
        // Cookies.set("userId", userAuth.user?.uid);
      } else {
        // Cookies.remove('userId')
        dispatch({ type: "REMOVE_USER", user: null });
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/detail/:productId" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route path="/signin" component={SignIn} />
          <Route path="/register" component={Register} />
          <Route path="/no" component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
