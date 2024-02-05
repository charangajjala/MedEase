import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  }, [logout, navigate]);

  return null;
};

export default Logout;
