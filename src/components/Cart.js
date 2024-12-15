import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../redux/cartSlice";
import { Table, Button, Form, Row, Col } from "react-bootstrap";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleRemove = (productId) => {
    dispatch(removeItemFromCart({ productId }));
  };

  const handleIncrease = (productId) => {
    dispatch(increaseItemQuantity({ productId }));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseItemQuantity({ productId }));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const tax = calculateTotal() * 0.1;
  const grandTotal = calculateTotal() + tax;

  return (
    <div>
      <h4 className="text-center mb-4">Your Cart ({cartItems.length} items)</h4>
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId}>
              <td>
                <strong>{item.name}</strong>
              </td>
              <td>${item?.price?.toFixed(2)}</td>
              <td>
                <div className="d-flex align-items-center">
                  <Button
                    variant="danger"
                    size="sm"
                    className="me-2"
                    onClick={() => handleDecrease(item.productId)}
                  >
                    -
                  </Button>
                  <Form.Control
                    value={item.quantity}
                    readOnly
                    className="text-center"
                    style={{ width: "35px", height: "31px" }}
                  />
                  <Button
                    variant="success"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleIncrease(item.productId)}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td>${(item?.price * item?.quantity)?.toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemove(item.productId)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="mt-4">
        <Col>
          <Table borderless>
            <tbody>
              <tr>
                <td>Sub Total:</td>
                <td>${calculateTotal()?.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Sales Tax:</td>
                <td>${tax?.toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Grand Total:</strong>
                </td>
                <td>
                  <strong>${grandTotal?.toFixed(2)}</strong>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
