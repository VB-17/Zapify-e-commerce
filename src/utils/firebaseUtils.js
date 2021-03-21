import db from "../firebase";

export const createUser = async (userAuth) => {
  const userRef = db.doc(`Users/${userAuth.uid}`);
  const snap = await userRef.get();

  if (!snap.exists) {
    try {
      await userRef.set({
        createdAt: new Date().toUTCString(),
        email: userAuth.email,
        cart: [],
      });
    } catch (err) {
      console.log("Error Adding user", err.message);
    }
  }
  return userRef;
};

export const setItemToCart = async (userId, productId, size) => {
  const userRef = db.doc(`Users/${userId}`);
  const snap = await userRef.get();
  const data = snap.data();
  const cart = await data?.cart;

  const isPresent = cart?.some((item) => {
    return item.product === productId && item.size === size;
  });

  if (isPresent) {
    const item = cart.find((item) => {
      return item.product === productId && item.size === size;
    });

    item.quantity += 1;
  } else {
    cart?.push({ product: productId, size: size, quantity: 1 });
  }

  try {
    await userRef.update({
      cart: cart,
    });
  } catch (err) {
    console.log("Cannot add item to cart", err.message);
  }
};

const getItems = async (item_ids) => {
  const refs = item_ids.map((id) => {
    return db.collection("Products").doc(id).get();
  });
  const resolved = await Promise.all(refs);
  const data = resolved.map((item) => item.data());

  return data;
};

export const getCartItems = async (userId) => {
  const userRef = db.doc(`Users/${userId}`);
  const cart = (await userRef.get()).data()?.cart;

  const cartItems = [];
  if (cart) {
    const ids = cart.map((item) => {
      return item.product || item.id;
    });

    const products = await getItems(ids);

    products.forEach((item, index) => {
      const { product, size, quantity } = cart[index];

      cartItems.push({
        title: item.title,
        price: item.price,
        image: item.image,
        size,
        quantity,
        product,
      });
    });
  }

  return cartItems;
};

export const toggleQuantity = async (userId, productId, size, variable) => {
  const userRef = db.doc(`Users/${userId}`);
  const snap = await userRef.get();
  const cart = snap.data()?.cart;

  const modifiedArray = [];

  cart.forEach((v) => {
    if (v.product === productId && v.size === size) {
      if (variable === "inc") {
        v.quantity += 1;
      } else if (variable === "dec") {
        if (!(v.quantity > 0)) {
          v.quantity -= 1;
        }
      }
    }

    modifiedArray.push(v);
  });

  console.log(modifiedArray);

  try {
    await userRef.update({
      cart: modifiedArray,
    });
  } catch (err) {
    console.log("Cannot updating the cart", err.message);
  }
};

// export const removeItem = async (userId, productId, productSize) => {
//   const userRef = db.doc(`Users/${userId}`);
//   const snap = await userRef.get();
//   const cart = snap.data()?.cart;
//   let cart = [];
//   db.collection("Users")
//     .doc(userId)
//     .onSnapshot((snap) => {
//       cart.push(snap.data().cart);
//     });

//   const newCart = cart.filter(
//     (v) => v.product !== productId && v.size !== productSize
//   );

//   const newCart = cart.filter(
//     (v) => v.product !== productId && v.size !== productSize
//   );

//   const newCart = cart.filter(
//     ({ product, size }) => product !== productId && size !== productSize
//   );

//   try {
//     await userRef.update({
//       cart: newCart,
//     });
//   } catch (err) {
//     console.log("Cannot remove item", err.message);
//   }
// };
