import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./LoginBox.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import endpoints from "../../constants/endpoints";
import axios from "../../api/axios";

const initialState = {
  email: "",
  password: "",
};

function loginReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, email: action.payload };
    case "SET_PWD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

const LoginBox = ({ onClose, onLogin, show }) => {
  const navigate = useNavigate();
  const [{ email, password }, dispatch] = useReducer(
    loginReducer,
    initialState
  );
  const { setAuth } = useContext(AuthContext);

  if (!show) {
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
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
      setAuth({ email, password, accessToken, refreshToken });
      console.log(role);
      onLogin();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-box">
      <div className="login-box__close">
        <FontAwesomeIcon icon={faClose} onClick={onClose} />
      </div>
      <h2>Login</h2>
      <form>
        <div className="login-box__input-group">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            value={email}
            onChange={(e) =>
              dispatch({ type: "SET_USER", payload: e.target.value })
            }
          />
        </div>
        <div className="login-box__input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) =>
              dispatch({ type: "SET_PWD", payload: e.target.value })
            }
          />
        </div>
        <div className="login-box__buttons">
          <button className="login-box__button" onClick={(e) => handleLogin(e)}>
            Login
          </button>
          <button onClick={handleRegister}>Register</button>
        </div>
      </form>
    </div>
  );
};

LoginBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default LoginBox;
