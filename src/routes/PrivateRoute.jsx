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
        const response = await axios.get("/api/v1/users/me", {
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(saveUser(response.data.data));
        } else {
          dispatch(logout());
          dispatch(getProperties([]));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(logout());
        dispatch(getProperties([]));
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
