import { useReducer } from "react";
import { Button, FormInput, Footer, PasswordInput } from "../../../components";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import endpoints from "../../../constants/endpoints";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "USER",
  errMsg: "",
  success: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PWD":
      return { ...state, password: action.payload };
    case "SET_ERR_MSG":
      return { ...state, errMsg: action.payload };
    case "SET_CONFIRM_PWD":
      return { ...state, confirmPassword: action.payload };
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    default:
      return state;
  }
}

const Register = () => {
  const [
    { username, password, confirmPassword, email, role, errMsg },
    dispatch,
  ] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch({ type: "SET_ERR_MSG", payload: "Passwords do not match!" });
      console.log("Passwords do not match!");
    }

    try {
      const response = await axios.post(endpoints.REGISTER, {
        username,
        email,
        password,
        role,
      });

      if (response.data.success) {
        dispatch({ type: "SET_SUCCESS", payload: true });
        navigate("/dashboard");
      } else {
        dispatch({ type: "SET_ERR_MSG", payload: response.data.message });
      }

      navigate("/dashboard");
    } catch (error) {
      dispatch({
        type: "SET_ERR_MSG",
        payload: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="register-layout">
        <div className="register-layout__content">
          <div className="register-layout__content__header">
            <h1>Register</h1>
          </div>
          <form
            className="register-layout__content__form"
            onSubmit={handleSubmit}
          >
            <FormInput
              label="Username"
              type="text"
              id="username"
              name="username"
              onChange={(e) =>
                dispatch({ type: "SET_USERNAME", payload: e.target.value })
              }
              required={true}
              autoComplete="off"
            />
            <FormInput
              label="Email"
              type="email"
              id="email"
              name="email"
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              required={true}
              autoComplete="off"
            />
            <PasswordInput
              id="password"
              label="Password"
              onChange={(e) =>
                dispatch({ type: "SET_PWD", payload: e.target.value })
              }
              required={true}
              autoComplete="off"
            />
            <PasswordInput
              id="confirm-password"
              label="Confirm Password"
              onChange={(e) =>
                dispatch({ type: "SET_CONFIRM_PWD", payload: e.target.value })
              }
              required={true}
              autoComplete="off"
            />
          </form>
          {errMsg && <span className="error-message">{errMsg}</span>}
          <div className="register-layout__content__button">
            <Button type="submit" name="Register" onClick={handleSubmit} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
