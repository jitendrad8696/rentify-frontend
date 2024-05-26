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
      await axios.post("https://rentify-backend-llkc.onrender.com/api/v1/users/logout");

      dispatch(logout());
      dispatch(getProperties([]));

      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return logoutUser;
};

export default useLogout;
