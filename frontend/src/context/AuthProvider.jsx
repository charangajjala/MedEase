import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null });

  const login = (user) => setAuth({ user });
  const logout = () => setAuth({ user: null });

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
