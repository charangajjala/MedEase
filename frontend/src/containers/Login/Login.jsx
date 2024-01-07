import { useRef, useEffect, useContext, useReducer } from "react";

import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import "./Login.scss";
import store from "../../assets/store.jpg";
import { useNavigate } from "react-router-dom";

import {
  Button, 
  Footer,
  FormInput,
} from "../../components/index.js";

const LOGIN_URL = "/api/login/";

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
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  // const errRef = useRef();

  // const [user, setUser] = useState("");
  // const [errMsg, setErrMsg] = useState("");
  // const [pwd, setPwd] = useState("");
  // const [success, setSuccess] = useState(false);

  const [{email, errMsg, password, success}, dispatch] = useReducer(loginReducer, initialState);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_ERR_MSG", payload: "" });
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      setAuth({ email, password, accessToken, refreshToken });
      // setSuccess(true);
      // setUser("");
      // setPwd("");
      // setErrMsg("");
      dispatch({ type: "LOGGED_IN" });
      navigate("/dashboard");
    } catch (e) {
      if (!e?.response) {
        // setErrMsg("No Server Response");
        dispatch({ type: "SET_ERR_MSG", payload: "No Server Response" });
      } else if (e.response.status === 400) {
        // setErrMsg("Invalid username or password");
        dispatch({ type: "SET_ERR_MSG", payload: "Invalid username or password" });
      } else if (e.response.status === 401) {
        // setErrMsg("Unauthorized");
        dispatch({ type: "SET_ERR_MSG", payload: "Unauthorized" });
      } else {
        // setErrMsg("Something went wrong");
        dispatch({ type: "SET_ERR_MSG", payload: "Something went wrong" });
      }
      // setSuccess(false);
      dispatch({ type: "SET_SUCCESS", payload: false });
      // errRef.current.focus();
    }
  };

  const handleReset = () => {
    // setUser("");
    // setPwd("");
    dispatch({ type: "RESET" });
    userRef.current.focus();
  };

  return (
    <>
      <div className="login-layout">
        <div className="login-layout__container">
          <div className="login-layout__container-left">
            <h1>Medical Store Admin</h1>
            <form className="login-layout__container-left__form">
              <div className="login-layout__container-left__form__input">
                <FormInput
                  label="Username"
                  type="text"
                  id="username"
                  name="username"
                  value={email}
                  onChange={(e) => dispatch({ type: "SET_USER", payload: e.target.value })}
                  required
                  autoComplete="off"
                  ref={userRef}
                />
              </div>
              <div className="login-layout__container-left__form__input">
                <FormInput
                  label="Password"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => dispatch({ type: "SET_PWD", payload: e.target.value })}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="login-layout__container-left__form__buttons">
                <Button name="Login" type="submit" function={handleLogin} />
                <Button name="Reset" type="button" function={handleReset} />
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
