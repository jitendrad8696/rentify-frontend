import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AuthLayout2 from "../layouts/AuthLayout2";
import MainLayout from "../layouts/MainLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Home from "../pages/Home";
import PrivateRoute from "../routes/PrivateRoute";
import AuthenticatedRoute from "../routes/AuthenticatedRoute";
import PostProperty from "../pages/PostProperty";
import Properties from "../pages/Properties";
import FilterProperties from "../pages/FilterProperties";
import EditProperty from "../pages/EditProperty";
import BuyerProperties from "../pages/BuyerProperties";
import MyProperties from "../pages/MyProperties";
import SellerRoutes from "./SellerRoutes";
import BuyerRoutes from "./BuyerRoutes";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthenticatedRoute />}>
          <Route path="/" element={<AuthLayout />}>
            <Route path="" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<Home />} />

            <Route element={<SellerRoutes />}>
              <Route path="post-property" element={<PostProperty />} />
              <Route path="my-properties" element={<Properties />} />
              <Route path="edit-property/:id" element={<EditProperty />} />
            </Route>

            <Route element={<BuyerRoutes />}>
              <Route path="watchlist" element={<MyProperties />} />
              <Route path="filter-properties" element={<FilterProperties />} />
              <Route path="properties" element={<BuyerProperties />} />
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<AuthLayout2 />}>
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
