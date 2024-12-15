import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../common/constants";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.accessToken);
        navigate(ROUTES.MAIN);
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      setError("Error occurred during login.");
      console.error(error);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={9} className="p-4 bg-white rounded shadow-sm">
          <h2 className="text-center mb-4">Sign in</h2>
          <p className="text-center text-muted mb-4">
            Welcome back to Ecomm App! Please enter your details below to sign
            in.
          </p>
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end mb-3">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <Button variant="success" type="submit" className="w-100">
              Log in
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p className="text-muted">
              Don't have an account? <Link to="/signup">Sign up now</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
