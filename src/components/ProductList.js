import React, { useState, useEffect } from "react";

import Product from "./Product";
import Loader from "./Loader";

import db from "../firebase";

function ProductList() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const unsubscribe = db.collection("Products").onSnapshot((snapshot) =>
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => unsubscribe();
  }, []);

  return (
    <div id="productList" className="productList">
      {products ? (
        <>
          <div className="productList__latest">
            <h1>Latest Products</h1>
            <div className="grid">
              {products.slice(0, 4).map((item) => (
                <div key={item.id}>
                  <Product info={item.data} productId={item.id} />
                </div>
              ))}
            </div>
          </div>
          <div className="productList__featured">
            <h1>Featured Products</h1>
            <div className="grid">
              {products.slice(4, products.length).map((item) => (
                <div key={item.id}>
                  <Product info={item.data} productId={item.id} />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="productList__loader">
          <Loader size={100} />
        </div>
      )}
      ;
    </div>
  );
}

export default ProductList;
