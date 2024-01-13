import { useReducer } from "react";
import { Button, FormInput, Footer, PasswordInput } from "../../../components";
import "./Register.scss";
import { useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PWD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PWD":
      return { ...state, confirmPassword: action.payload };
    default:
      return state;
  }
}

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <>
      <div className="register-layout">
        <div className="register-layout__content">
          <div className="register-layout__content__header">
            <h1>Register</h1>
          </div>
          <div className="register-layout__content__form">
            <FormInput
              label="Username"
              type="text"
              id="username"
              name="username"
              onChange={(e) =>
                dispatch({ type: "SET_USERNAME", payload: e.target.value })
              }
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
              autoComplete="off"
            />
            <PasswordInput
              id="password"
              label="Password"
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "SET_PWD", payload: e.target.value })
              }
              autoComplete="off"
            />
            <PasswordInput
              id="confirm-password"
              label="Confirm Password"
              value={state.confirmPassword}
              onChange={(e) =>
                dispatch({ type: "SET_CONFIRM_PWD", payload: e.target.value })
              }
              autoComplete="off"
            />
          </div>
          <div className="register-layout__content__button">
            <Button name="Register" type="submit" onClick={handleSubmit} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
