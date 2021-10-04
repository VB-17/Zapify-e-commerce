import { useState, useEffect } from "react";

import db from "../firebase";

function useProduct(productId) {
  const [productData, setProductData] = useState();

  useEffect(() => {
    const unsubscribe = db
      .collection("Products")
      .doc(productId)
      .onSnapshot((snapshot) => setProductData(snapshot.data()));

    return () => unsubscribe();
  }, [productId]);

  return productData;
}

export default useProduct;
