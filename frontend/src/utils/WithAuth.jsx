import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WithAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    console.log(
      `WithAuth: Initializing WithAuthComponent for ${WrappedComponent.name}`
    );
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      console.log("WithAuth: Inside useEffect for checking authentication");
      const authObj = JSON.parse(localStorage.getItem("auth"));
      console.log(`WithAuth: Retrieved authObj = ${JSON.stringify(authObj)}`);

      if (authObj?.accessToken && authObj?.refreshToken) {
        console.log("WithAuth: User is authenticated");
        setIsAuthenticated(true);
      } else {
        // Version 1
        // console.log("WithAuth: User is not authenticated, navigating to login");
        // navigate("/");

        // Version 2
        console.log("WithAuth: User is not authenticated")
        if (authObj?.role === "ADMIN") {
          navigate("/");
        } else {
          navigate("/");
        }
      }
    }, [navigate]);

    console.log(`WithAuth: Rendering ${WrappedComponent.name} component`);
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.name})`;
  return WithAuthComponent;
};

export default WithAuth;
