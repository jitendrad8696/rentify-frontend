import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../data/userSlice";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    userType: "buyer",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = (formData) => {
    const newErrors = {};

    // Validations
    if (
      !formData.firstName ||
      formData.firstName.length < 3 ||
      formData.firstName.length > 20
    ) {
      newErrors.firstName =
        "First name is required and should be 3-20 characters long.";
    }

    if (formData.lastName.length > 20) {
      newErrors.lastName = "Last name should not exceed 20 characters.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }

    const phonePattern = /^\+\d{1,3}\s?\d{6,14}$/;
    if (!formData.phoneNumber || !phonePattern.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Valid phone number is required. Example: +918696958620";
    }

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!formData.password || !passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include one special character, one lowercase letter, one uppercase letter, and one numeric value.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim form data before validation
    const trimmedFormData = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "password") {
        trimmedFormData[key] = formData[key].trim();
      } else {
        trimmedFormData[key] = formData[key];
      }
    });
    setFormData(trimmedFormData);

    const validationErrors = validate(trimmedFormData);
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      try {
        const response = await axios.post(
          "/api/v1/users/register",
          trimmedFormData
        );

        if (response.data.success) {
          dispatch(saveUser(response.data.data));
          navigate("/home");
        } else {
          setErrors({ api: response.data.message });
        }
      } catch (error) {
        setErrors({
          api: error.response?.data?.message || "Registration failed",
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="bg-white p-6 pt-2 mt-4 rounded-lg shadow-2xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Jitendra"
            className={`w-full p-2 border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
        </div>
        <div className="mb-1">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Dhakar"
            className={`w-full p-2 border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
        </div>
        <div className="mb-1">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jitendrad869601@gmail.com"
            className={`w-full p-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-1">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+918696958620"
            className={`w-full p-2 border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
        </div>
        <div className="mb-1">
          <label className="block text-gray-700">User Type</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            className={`w-full p-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register
        </button>
        {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>}
      </form>
      <p className="mt-2 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
