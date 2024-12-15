import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import PublicRoute from "./PublicRoute";
import { ROUTES } from "./common/constants";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login";
import Home from "./components/Home";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: `${ROUTES.LOGIN}`,
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: ROUTES.MAIN,
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },

    {
      path: "*",
      element: <Navigate to={`${ROUTES.LOGIN}`} replace />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
