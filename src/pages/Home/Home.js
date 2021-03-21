import React, { useRef } from "react";
import "./Home.scss";

import ScrollIndicator from "../../components/ScrollIndicator/ScrollIndicator";
import ProductList from "../../components/ProductList/ProductList";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  // const [{ user }] = useGlobalState();
  const logoRef = useRef();
  const bannerRef = useRef();

  const handleClick = () => {
    document
      .getElementById("productList")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar isSticky={false} />
      <div className="home">
        <div className="home__banner">
          <div className="home__banner-container">
            <div ref={bannerRef} className="home__banner-container--info">
              <h1>Experience The Lifestyle.</h1>
              <p>
                We at Zapify offer the best serivces in online shopping. Shop
                with us to have once in a lifetime shopping experience.
              </p>
              <button onClick={handleClick}>Shop now</button>
            </div>

            <img ref={logoRef} src="/assets/home_logo.png" alt="" />
          </div>
          <div className="scroll">
            <ScrollIndicator />
          </div>
        </div>

        <div className="home__products">
          <ProductList />
        </div>
      </div>
    </>
  );
}

export default Home;
