import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";

function AuthLayout2() {
  const user = useSelector((state) => state.user.user);
  return user && user.email ? <MainLayout /> : <Outlet />;
}

export default AuthLayout2;
