import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectRoutes({ children }) {
  const token = useSelector((state) => state.auth.accessToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
