import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../data/userSlice";
import { getProperties } from "../data/propertySlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const token = localStorage.getItem('authToken');
      localStorage.setItem('authToken', token);
      await axios.post(
        "https://rentify-backend-llkc.onrender.com/api/v1/users/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      dispatch(logout());
      dispatch(getProperties([]));
      localStorage.setItem("authToken", "");
      localStorage.removeItem("authToken");

      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return logoutUser;
};

export default useLogout;
