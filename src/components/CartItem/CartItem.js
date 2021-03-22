import React, { useEffect } from "react";
import "./CartItem.scss";

import { useGlobalState } from "../../contexts/StateProvider";
import db from "../../firebase";

import { toggleQuantity, removeItem } from "../../utils/firebaseUtils";

function CartItem({
  remove,
  toggle,
  product,
  title,
  price,
  size,
  quantity,
  image,
}) {
  const [{ user }, dispatch] = useGlobalState();

  return (
    <div className="cartItem">
      <div className="cartItem__col1">
        <img src={image} alt="cartItem" />
        <div className="cartItem__col1--info">
          <h2>{title}</h2>
          <h4>
            <span className="cartItem__size">Size: </span>
            {size}
          </h4>
        </div>
      </div>
      <div className="cartItem__col2">
        <button onClick={() => toggleQuantity(user.uid, product, size, "dec")}>
          -
        </button>
        <h3>{quantity}</h3>
        <button onClick={() => toggleQuantity(user.uid, product, size, "inc")}>
          +
        </button>
      </div>
      <div className="cartItem__col3">
        <h3>${price}.00</h3>
      </div>
      <div className="cartItem__col4">
        <button onClick={() => removeItem(user.uid, product, size)}>X</button>
      </div>
    </div>
  );
}

export default CartItem;
