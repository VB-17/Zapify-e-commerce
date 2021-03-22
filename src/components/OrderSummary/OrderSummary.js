import React from "react";
import "./OrderSummary.scss";

function OrderSummary({ cart }) {
  const totalCost = cart.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
  
  return (
    <div className="OrderSummary">
      <div className="OrderSummary__card">
        <h2>Order Summary</h2>
        <div className="OrderSummary__card--detail">
          <div className="row">
            <h3>Items :</h3>
            <p>{cart.length}</p>
          </div>
          <div className="row">
            <h3>Shipping :</h3>
            <p>Free</p>
          </div>
          <div className="row">
            <h3>Total :</h3>
            <p>${totalCost}.00</p>
          </div>
          <div className="row">
            <button>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
