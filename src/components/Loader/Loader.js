import React from "react";
import "./Loader.scss";

function Loader({ size }) {
  return (
    <div className="loaders">
      <h1>Loading..</h1>
      <div
        className="loaders__circular"
        style={{ 
          height: `${size}px`, 
          width: `${size}px`, 
          border: `${(15/100)*size}px rgba(0,0,0,.1) solid`, 
          borderTop:`${(15/100)*size}px #f5745d solid`
        }}
      ></div>
    </div>
  );
}

export default Loader;
