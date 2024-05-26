import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { saveUser, logout } from "../data/userSlice";
import { getProperties } from "../data/propertySlice";

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log(token);
        const response = await axios.get(
          "https://rentify-backend-llkc.onrender.com/api/v1/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          dispatch(saveUser(response.data.data));
        } else {
          dispatch(logout());
          dispatch(getProperties([]));
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(logout());
        dispatch(getProperties([]));
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    if (!user || !user.email) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return user && user.email ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
