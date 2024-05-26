import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SellerRoutes() {
  const user = useSelector((state) => state.user.user);
  return user.userType === "seller" ? <Outlet /> : <Navigate to="/home" />;
}

export default SellerRoutes;
