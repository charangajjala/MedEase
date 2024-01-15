import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./LoginBox.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const LoginBox = ({ onClose, onLogin, show }) => {
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  const handleLogin = () => {
    onLogin();
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
          <input type="username" id="username" />
        </div>
        <div className="login-box__input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="login-box__buttons">
          <button className="login-box__button" onClick={handleLogin}>
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
