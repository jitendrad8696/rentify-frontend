import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../data/userSlice";
import axios from "axios";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = (formData) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedFormData = { email: formData.email.trim() };
    const validationErrors = validate(trimmedFormData);

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});

      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
          "https://rentify-backend-llkc.onrender.com/api/v1/users/forgot-password",
          trimmedFormData,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          alert(
            "We sent you a randomly generated password. Now you can login with that password and reset your password."
          );

          setTimeout(() => {
            dispatch(logout());
            localStorage.removeItem("authToken");
            navigate("/login");
          }, 5000);

          setTimeout(() => {
            alert("Redirecting you to the login page...");
          }, 1000);
        } else {
          setErrors({ api: response.data.message });
        }
      } catch (error) {
        setErrors({
          api:
            error.response?.data?.message ||
            "An error occurred. Please try again.",
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your-email@example.com"
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-2 text-right">
            <Link to="/reset-password" className="text-blue-500 text-sm">
              Reset Password
            </Link>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
          {errors.api && (
            <p className="text-red-500 text-sm mt-1">{errors.api}</p>
          )}
        </form>
        <p className="mt-2 text-center">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
