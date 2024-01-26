import { useRef, useEffect, useContext, useReducer, useState } from "react";

import AuthContext from "../../context/AuthProvider.jsx";
import axios from "../../api/axios.jsx";
import "./Login.scss";
import store from "../../assets/store.jpg";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  Button,
  Footer,
  FormInput,
  Loading,
  PasswordInput,
} from "../../components/index.js";
import endpoints from "../../constants/endpoints.js";

const initialState = {
  email: "",
  password: "",
  errMsg: "",
  success: false,
};

function loginReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, email: action.payload };
    case "SET_PWD":
      return { ...state, password: action.payload };
    case "SET_ERR_MSG":
      return { ...state, errMsg: action.payload };
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    case "LOGGED_IN":
      return { ...state, email: "", password: "", errMsg: "", success: true };
    default:
      return state;
  }
}

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [loggingIn, setLoggingIn] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const userRef = useRef();

  const [{ email, errMsg, password, success }, dispatch] = useReducer(
    loginReducer,
    initialState
  );

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const authObj = JSON.parse(localStorage.getItem("auth"));
    setRedirecting(true);
    if (Boolean(authObj.accessToken) && Boolean(authObj.refreshToken)) {
      // navigate("/admin/dashboard");
      if (authObj.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      navigate("/");
    }
    setRedirecting(false);
  }, [navigate]);

  useEffect(() => {
    dispatch({ type: "SET_ERR_MSG", payload: "" });
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login: handleLogin");
    setLoggingIn(true);
    try {
      const response = await axios.post(
        endpoints.LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      const role = response?.data?.role;
      setAuth({ email, password, accessToken, refreshToken, role });

      // navigate to dashboard based on role
      // Modify the default routing to /admin/dashboard if logged in as per the role
      // Adding it here might be redundant
      switch (role) {
        case "ADMIN":
          dispatch({ type: "LOGGED_IN" });
          console.log("Login: Navigating to dashboard");
          navigate("/admin/dashboard");
          break;
        case "USER":
          dispatch({ type: "LOGGED_IN" });
          console.log("Login: Navigating to dashboard");
          navigate("/dashboard");
          break;
        default:
          navigate("/");
      }

      // console.log("Login: Navigating to dashboard");
      // navigate("/admin/dashboard");
    } catch (e) {
      if (!e?.response) {
        dispatch({ type: "SET_ERR_MSG", payload: "No Server Response" });
      } else if (e.response.status === 400) {
        dispatch({
          type: "SET_ERR_MSG",
          payload: "Invalid username or password",
        });
      } else if (e.response.status === 401) {
        dispatch({ type: "SET_ERR_MSG", payload: "Unauthorized" });
      } else {
        dispatch({ type: "SET_ERR_MSG", payload: "Something went wrong" });
      }
      dispatch({ type: "SET_SUCCESS", payload: false });
    } finally {
      setLoggingIn(false);
    }
  };

  const hangleRegister = () => {
    console.log("register");
    navigate("/register");
  };

  if (loggingIn) {
    return <Loading message={"Logging in..."} />;
  }

  if (redirecting) {
    return <Loading message={"Redirecting..."} />;
  }

  return (
    <>
      <div className="login-layout">
        <Toaster position="bottom-right" reverseOrder={false} />
        <div className="login-layout__container">
          <div className="login-layout__container-left">
            <h1>Store Login</h1>
            <form className="login-layout__container-left__form">
              <div className="login-layout__container-left__form__input">
                <FormInput
                  label="Username"
                  type="text"
                  id="username"
                  name="username"
                  value={email}
                  onChange={(e) =>
                    dispatch({ type: "SET_USER", payload: e.target.value })
                  }
                  required
                  autoComplete="off"
                  ref={userRef}
                />
              </div>
              <div className="login-layout__container-left__form__input">
                <PasswordInput
                  id="password"
                  label="Password"
                  value={password}
                  onChange={(e) =>
                    dispatch({ type: "SET_PWD", payload: e.target.value })
                  }
                  required
                  autoComplete="off"
                />
              </div>
              <div className="login-layout__container-left__form__buttons">
                <Button name="Login" type="submit" onClick={handleLogin} />
                <Button
                  name="Register"
                  type="button"
                  onClick={hangleRegister}
                />
              </div>
            </form>
            {errMsg && <p className="error-message">{errMsg}</p>}
            {success && <p className="success-message">Login successful!</p>}
          </div>
          <div className="login-layout__container-right">
            <img src={store} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
