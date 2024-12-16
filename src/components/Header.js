import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../common/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="app-header">
      <h1>Ecomm</h1>
      <Button onClick={handleLogout} variant="success" type="submit">
        Logout
      </Button>
    </div>
  );
};

export default Header;
