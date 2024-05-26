import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function BuyerRoutes() {
  const user = useSelector((state) => state.user.user);
  return user.userType === "buyer" ? <Outlet /> : <Navigate to="/home" />;
}

export default BuyerRoutes;
