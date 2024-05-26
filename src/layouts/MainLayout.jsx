import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

function Sidebar() {
  const userInfo = useSelector((state) => state.user.user);
  const logoutUser = useLogout();

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">User Info</h2>
        <p className="mt-2">
          Name: {userInfo.firstName} {userInfo.lastName}
        </p>
        <p className="mt-2">Email: {userInfo.email}</p>
        <p className="mt-2">Phone: {userInfo.phoneNumber}</p>
        <p className="mt-2">User Type: {userInfo.userType}</p>
      </div>
      <div className="mt-4">
        {userInfo.userType === "seller" ? (
          <>
            <Link
              to="/my-properties"
              className="block mt-2 p-2 bg-green-500 rounded hover:bg-green-600 text-center"
            >
              My Properties
            </Link>

            <Link
              to="/post-property"
              className="block mt-2 p-2 bg-green-500 rounded hover:bg-green-600 text-center"
            >
              Post Property
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/watchlist"
              className="block mt-2 p-2 bg-green-500 rounded hover:bg-green-600 text-center"
            >
              Watchlist
            </Link>
            <Link
              to="/filter-properties"
              className="block mt-2 p-2 bg-green-500 rounded hover:bg-green-600 text-center"
            >
              Filter Properties
            </Link>
          </>
        )}
        <Link
          to="/reset-password"
          className="block mt-2 p-2 bg-blue-500 rounded hover:bg-blue-600 text-center"
        >
          Reset Password
        </Link>
        <Link
          to="/forgot-password"
          className="block mt-2 p-2 bg-blue-500 rounded hover:bg-blue-600 text-center"
        >
          Forgot Password
        </Link>
        <button
          onClick={logoutUser}
          className="block mt-2 p-2 bg-red-500 rounded hover:bg-red-600 w-full text-center"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function MainLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
