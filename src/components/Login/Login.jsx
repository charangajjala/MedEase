import { useRef, useState, useEffect, useContext } from "react";

import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import "./Login.scss";
import Button from "../Button/Button";
import store from "../../assets/store.jpg";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
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
      setSuccess(true);
      setUser("");
      setPwd("");
      setErrMsg("");
      navigate("/dashboard");
      
    } catch (e) {
      if (!e?.response) {
        setErrMsg("No Server Response");
      } else if (e.response.status === 400) {
        setErrMsg("Invalid username or password");
      } else if (e.response.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Something went wrong");
      }
      setSuccess(false);
      errRef.current.focus();
    }

    if (user === "admin" && pwd === "password") {
      setSuccess(true);
      setUser("");
      setPwd("");
      setErrMsg("");
      navigate("/dashboard");
    } else {
      setSuccess(false);
      setErrMsg("Invalid username or password");
    }
  };

  const handleReset = () => {
    setUser("");
    setPwd("");
    userRef.current.focus();
  };

  return (
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
                onChange={(e) => setUser(e.target.value)}
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
                onChange={(e) => setPwd(e.target.value)}
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
  );
};

export default Login;
