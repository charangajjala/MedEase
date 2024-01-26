import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RedirectToast from "../../utils/RedirectToast";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    toast.custom(
      (t) => (
        <RedirectToast
          duration={t.duration}
          message="Logged out successfully"
        />
      ),
      {
        duration: 4000,
        id: "logout-toast",
      }
    );
    navigate("/");
  }, [logout, navigate]);

  return null;
};

export default Logout;
