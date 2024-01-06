import { useRef, useEffect, useContext, useReducer } from "react";

import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import "./Login.scss";
import store from "../../assets/store.jpg";
import { useNavigate } from "react-router-dom";

import {
  Button, 
  Footer,
} from "../../components/index.js";

const LOGIN_URL = "";

const initialState = {
  user: "",
  pwd: "",
  errMsg: "",
  success: false,
};

function loginReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_PWD":
      return { ...state, pwd: action.payload };
    case "SET_ERR_MSG":
      return { ...state, errMsg: action.payload };
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    case "LOGGED_IN":
      return { ...state, user: "", pwd: "", errMsg: "", success: true };
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
  const errRef = useRef();

  // const [user, setUser] = useState("");
  // const [errMsg, setErrMsg] = useState("");
  // const [pwd, setPwd] = useState("");
  // const [success, setSuccess] = useState(false);

  const [{user, errMsg, pwd, success}, dispatch] = useReducer(loginReducer, initialState);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_ERR_MSG", payload: "" });
  }, [user, pwd]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      setAuth({ user, pwd, accessToken, refreshToken });
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
      errRef.current.focus();
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
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder=""
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  // onChange={(e) => setUser(e.target.value)}
                  onChange = {(e) => dispatch({ type: "SET_USER", payload: e.target.value })}
                  value={user}
                  required
                />
              </div>
              <div className="login-layout__container-left__form__input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder=""
                  id="password"
                  // onChange={(e) => setPwd(e.target.value)}
                  onChange = {(e) => dispatch({ type: "SET_PWD", payload: e.target.value })}
                  value={pwd}
                  required
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