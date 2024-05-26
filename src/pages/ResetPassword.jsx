import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../data/userSlice";
import axios from "axios";

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = (formData) => {
    const newErrors = {};

    // Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Old password is required.";
    }

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!formData.newPassword || !passwordPattern.test(formData.newPassword)) {
      newErrors.newPassword =
        "New password must be at least 8 characters long and include one special character, one lowercase letter, one uppercase letter, and one numeric value.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim form data before validation
    const trimmedFormData = {
      email: formData.email.trim(),
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };

    setFormData(trimmedFormData);

    const validationErrors = validate(trimmedFormData);
    if (Object.keys(validationErrors).length === 0) {
      setErrors(validationErrors);

      try {
        const response = await axios.put(
          "/api/v1/users/reset-password",
          trimmedFormData
        );

        if (response.data.success) {
          alert("Password reset successfully.");

          setTimeout(() => {
            dispatch(logout());
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
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
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
          <div className="mb-2">
            <label className="block text-gray-700">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="********"
              className={`w-full p-2 border ${
                errors.oldPassword ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="********"
              className={`w-full p-2 border ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>
          <div className="mb-2 text-right">
            <Link to="/forgot-password" className="text-blue-500 text-sm">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset Password
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

export default ResetPassword;
