import Navbar from "../components/Navbar";
import ImageComposition from "../components/ImageComposition";
import DetailProductInfo from "../components/DetailProductInfo";
import Loader from "../components/Loader";

import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";

function Details() {
  const { productId } = useParams();
  const productData = useProduct(productId);

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
