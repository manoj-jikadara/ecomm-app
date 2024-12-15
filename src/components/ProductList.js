import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { fetchProducts } from "../redux/productsSlice";
import {
  addItemToCart,
  addItemToWishList,
  removeItemFromWishList,
} from "../redux/cartSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { wishList } = useSelector((state) => state.cart);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);

  const handleAddToCart = (product) => {
    dispatch(
      addItemToCart({
        productId: product.productId,
        quantity: 1,
        price: product.price,
        name: product.name,
      })
    );
  };

  const handleAddToWishList = (product) => {
    const isInWishList = wishList.some(
      (item) => item.productId === product.productId
    );
    if (isInWishList) {
      dispatch(removeItemFromWishList({ productId: product.productId }));
    } else {
      dispatch(
        addItemToWishList({
          productId: product.productId,
          price: product.price,
          name: product.name,
        })
      );
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Row className="g-3">
        <h4 className="text-center mb-4">Products</h4>
        {products.map((product) => (
          <Col xs={12} md={6} lg={4} key={product.productId}>
            <Card className="product-card">
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price.toFixed(2)}</Card.Text>
                <Button
                  variant="success"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant={
                    wishList.some(
                      (item) => item.productId === product.productId
                    )
                      ? "danger"
                      : "success"
                  }
                  className="ms-2"
                  onClick={() => handleAddToWishList(product)}
                >
                  {wishList.some(
                    (item) => item.productId === product.productId
                  ) ? (
                    <svg
                      width="24"
                      height="20"
                      fill="currentColor"
                      className="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 12s4-3.5 4-6A2.5 2.5 0 0 0 8 3a2.5 2.5 0 0 0-4 3C4 8.5 8 12 8 12z" />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="20"
                      fill="currentColor"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 12s4-3.5 4-6A2.5 2.5 0 0 0 8 3a2.5 2.5 0 0 0-4 3C4 8.5 8 12 8 12z" />
                    </svg>
                  )}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {loading && (
        <div className="text-center mt-4">
          <Spinner animation="border" />
          <p>Loading more products...</p>
        </div>
      )}
      {!loading && (
        <div className="text-center mt-4">
          <Button variant="secondary" onClick={handleLoadMore}>
            Load More Products
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductList;
