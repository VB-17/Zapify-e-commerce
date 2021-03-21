import React from "react";
import "./Product.scss";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

 
function Product({ info, productId }) {
  const { id, title, price, image, rating } = info;

  return (
    <Link to={`detail/${productId}`}>
      <div className="product">
        <img src={image} alt="" />
        <div className="product__details">
          <h2>{title}</h2>
          <Rating key={id} rating={rating} />
          <h3>${price}.00</h3>
        </div>
      </div>
    </Link>
  );
}

export default Product;
