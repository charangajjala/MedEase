import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const WithAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    console.log("WithAuth: Rendering wrapped component");
    const navigate = useNavigate();

    useEffect(() => {
      console.log("WithAuth: Checking authentication");
      const authObj = JSON.parse(localStorage.getItem("auth"));

      console.log(`WithAuth: authObj = ${JSON.stringify(authObj)}`);
      const isAuthenticated = Boolean(authObj.accessToken) && Boolean(authObj.refreshToken)
      
      console.log((Boolean(authObj.accessToken) && Boolean(authObj.refreshToken)),isAuthenticated);
      if (!isAuthenticated) {
        console.log("WithAuth: Redirecting to login");
        navigate("/");
      }
      console.log('WithAuth: Authentication successful')
    }, [navigate]);

    console.log(`WithAuth: Returning ${WrappedComponent.name}} component`);
    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.name})`;
  return WithAuthComponent;
};

export default WithAuth;
