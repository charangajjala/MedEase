import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
