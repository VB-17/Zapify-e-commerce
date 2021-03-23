import React, { useState, useEffect } from "react";

import db from "../firebase";
import Navbar from "../components/Navbar";
import OrderSummary from "../components/OrderSummary";
import { useGlobalState } from "../contexts/StateProvider";
import { getCartItems } from "../utils/firebaseUtils";
import Loader from "../components/Loader";
import CartItem from "../components/CartItem";

function Cart() {
  const [{ user }] = useGlobalState();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      if (user) {
        const items = await getCartItems(user.uid);
        setCart(items);
      }
    };

    fetchItems();
  }, [user]);

  const toggle = (id, size, type) => {
    const newCart = cart.map((item) => {
      if (item.product === id && item.size === size) {
        if (type === "inc") {
          item.quantity++;
        } else if (type === "dec" && item.quantity > 1) {
          item.quantity--;
        }
      }
      return item;
    });

    setCart(newCart);

    const dbCart = [];

    newCart.forEach((item) => {
      dbCart.push({
        quantity: item.quantity,
        size: item.size,
        product: item.product,
      });
    });

    const updateDb = async () => {
      const userRef = db.collection("Users").doc(user.uid);
      try {
        await userRef.update({
          cart: dbCart,
        });
      } catch (err) {
        console.log(err);
      }
    };

    updateDb();
  };

  const remove = (id, size) => {
    const newCart = cart.filter(
      (item) => item.proudct !== id && item.size !== size
    );

    setCart(newCart);

    const dbCart = [];

    newCart.forEach((item) => {
      dbCart.push({
        quantity: item.quantity,
        size: item.size,
        product: item.product,
      });
    });

    const updateDb = async () => {
      const userRef = db.collection("Users").doc(user.uid);
      try {
        await userRef.update({
          cart: dbCart,
        });
      } catch (err) {
        console.log(err);
      }
    };

    updateDb();
  };

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
                {cart.length === 0 && (
                  <h1 className="empty_cart">Your Cart is Empty</h1>
                )}
                {cart.map((p, idx) => (
                  <div key={idx} className="item">
                    <CartItem
                      {...p}
                      remove={(a, b) => remove(a, b)}
                      toggle={(a, b, c) => toggle(a, b, c)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="cartInfo__orderSummary">
              <OrderSummary cart={cart} />
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
