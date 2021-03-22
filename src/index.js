import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import dotenv from "dotenv";

import { StateProvider } from "./contexts/StateProvider";
import reducer, { initialState } from "./reducers/reducer";

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
