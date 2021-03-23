import React, { useState } from "react";

import { setItemToCart } from "../utils/firebaseUtils";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useHistory, useParams } from "react-router-dom";
import { useGlobalState } from "../StateProvider";

import SizeButtonGroup from "./SizeButtonGroup";

import { GiMoneyStack } from "react-icons/gi";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import StarsIcon from "@material-ui/icons/Stars";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

toast.configure();

function DetailProductInfo({ info }) {
  const [{ user }] = useGlobalState();
  const { productId } = useParams();

  const history = useHistory();

  const [selectedSize, setSelectedSize] = useState();
  const [error, setError] = useState(null);

  const handleClick = () => {
    if (selectedSize && user) {
      setItemToCart(user.uid, productId, selectedSize);
      toast.info("Item Added to Cart", { autoClose: 1000 });
      setError(null);
    } else if (!user) {
      history.push("/no");
    } else {
      setError("Please select a size");
    }
  };

  return (
    <div className="productDetail">
      <h1>{info.title}</h1>
      <h2>${info.price}.00</h2>
      <p>{info.desc}</p>

      <span className="error">{error}</span>

      <SizeButtonGroup setValue={(size) => setSelectedSize(size)} />

      <button onClick={handleClick}>Add to Cart</button>

      <div className="productDetail__section">
        <div className="icon">
          <StarsIcon />
          <span>100% Genuine Brands</span>
        </div>

        <div className="icon">
          <GiMoneyStack style={{ fontSize: "32px" }} />
          <span>Cash on delivery</span>
        </div>

        <div className="icon">
          <LocalShippingIcon />
          <span>Fast Delivery</span>
        </div>

        <div className="icon">
          <CreditCardIcon />
          <span>Secure Payments</span>
        </div>
      </div>
    </div>
  );
}

export default DetailProductInfo;
