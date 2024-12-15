import React from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";

const Home = () => {
  return (
    <div style={{ padding: "16px" }}>
      <div className="d-flex flex-column flex-lg-row gap-4">
        <div className="flex-grow-1">
          <ProductList />
        </div>
        <div className="flex-shrink-0">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Home;
