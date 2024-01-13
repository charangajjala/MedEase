import { useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
    console.log("Logging out...");
  }, [logout, navigate]);
  
  return null;
};

export default Logout;
