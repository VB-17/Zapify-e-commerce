import React, { useState, useEffect, useCallback } from "react";
import "./Cart.scss";

import Cookies from "js-cookie";

import db from "../../firebase";
import Navbar from "../../components/Navbar/Navbar";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { useGlobalState } from "../../contexts/StateProvider";
import { getCartItems } from "../../utils/firebaseUtils";
import Loader from "../../components/Loader/Loader";
import CartItem from "../../components/CartItem/CartItem";
import { UnsubscribeTwoTone } from "@material-ui/icons";

function Cart() {
  const [{ user }] = useGlobalState();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getCartItems(user?.uid);
      if (items) {
        setCart(items);
      }
    };

    fetchItems();
  }, [user]);

  const remove = (id, size) => {
    const index = cart.findIndex((i) => i.id === id && i.size === size);
    cart.splice(index, 1);
    const newCart = [...cart];
    setCart(newCart);
  };

  // const toggle = (id, size, type) => {
  //   const newCart = cart.map((item) => {
  //     if (item.id === id && item.size === size) {
  //       if (type === "inc") {
  //         return { ...item, quantity: item.quantity++ };
  //       } else if (type === "dec") {
  //         return { ...item, quantity: item.quantity-- };
  //       }
  //     }

  //     return item;
  //   });

  //   setCart(newCart);
  //   db.collection("Users").doc(user.uid).update({ cart: newCart });
  // };

  return (
    <>
      <Navbar />
      <div className="cart">
        <div className="cart__hero">
          <h1>Shopping Cart</h1>
        </div>
        {cart ? (
          <div className="cartInfo">
            <div className="cartInfo__detail">
              <div className="cartHeader">
                <h2>Your Cart</h2>
                <h2>{cart.length} items</h2>
              </div>
              <hr />
              <div className="cartInfo__items">
                {cart.map((p, idx) => (
                  <div key={idx} className="item">
                    <CartItem
                      {...p}
                      remove={(a, b) => remove(a, b)}
                      // toggle={(a, b, c) => toggle(a, b, c)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="cartInfo__orderSummary">
              <OrderSummary />
            </div>
          </div>
        ) : (
          <div className="cart__loader">
            <Loader size={100} />
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
