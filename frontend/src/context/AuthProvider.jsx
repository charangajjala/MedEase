import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: JSON.parse(localStorage.getItem('user')) });

  useEffect(() => {
    if (auth.user) {
      localStorage.setItem('user', JSON.stringify(auth.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [auth.user]);

  const login = (user) => {
    setAuth({ user });
  };

  const logout = () => {
    setAuth({ user: null });
    // Add logic here to call the backend to clear the HTTP-only cookie
  };

  console.log("auth", auth);

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
