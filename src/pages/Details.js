import React, { useEffect, useState } from "react";

import db from "../firebase";

import ImageComposition from "../components/ImageComposition";
import DetailProductInfo from "../components/DetailProductInfo";
import Loader from "../components/Loader";

import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function Details() {
  const [productData, setProductData] = useState();
  const { productId } = useParams();

  useEffect(() => {
    const unsubscribe = db
      .collection("Products")
      .doc(productId)
      .onSnapshot((snapshot) => setProductData(snapshot.data()));

    return () => unsubscribe();
  }, [productId]);

  return (
    <>
      <Navbar />
      <div className="details">
        {productData ? (
          <>
            <div className="details__container">
              <div className="details__composition">
                <ImageComposition
                  main={productData.image}
                  thumb={productData.thumbImages}
                />
              </div>
              <div className="details__info">
                <DetailProductInfo info={productData} />
              </div>
            </div>
          </>
        ) : (
          <Loader size={100} />
        )}
      </div>
    </>
  );
}

export default Details;
