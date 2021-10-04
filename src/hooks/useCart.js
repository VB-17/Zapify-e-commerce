import { useState, useEffect } from "react";

import db from "../firebase";
import { useGlobalState } from "../StateProvider";
import { getCartItems } from "../utils/firebaseUtils";

function updateDb(user, newCart) {
  const dbCart = [];

  newCart.forEach((item) => {
    dbCart.push({
      quantity: item.quantity,
      size: item.size,
      product: item.product,
    });
  });

  (async function () {
    const userRef = db.collection("Users").doc(user.uid);
    try {
      await userRef.update({
        cart: dbCart,
      });
    } catch (err) {
      console.log(err);
    }
  })();
}

function useCart() {
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
    updateDb(user, newCart);
  };

  const remove = (id, size) => {
    const newCart = cart.filter(
      (item) => item.proudct !== id && item.size !== size
    );

    setCart(newCart);
    updateDb(user, newCart);
  };

  return { cart, toggle, remove };
}

export default useCart;
