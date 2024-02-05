import { useNavigate } from "react-router-dom";
import { Footer, FormInput, PasswordInput } from "../../components";
import "./ForgotPassword.scss";
import { useReducer } from "react";
import axiosInstance from "../../api/axios";
import Endpoints from "../../constants/endpoints";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  errMsg: "",
  success: false,
  isSubmitting: false,
};

function reducer(state, action) {
  switch (action.type) {
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
    case "SET_IS_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    default:
      return state;
  }
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.password !== state.confirmPassword) {
      dispatch({ type: "SET_ERR_MSG", payload: "Passwords do not match" });
      return;
    }

    dispatch({ type: "SET_IS_SUBMITTING", payload: true });
    try {
      await axiosInstance.post(Endpoints.FORGOT_PASSWORD_URL, {
        email: state.email,
        password: state.password,
      });
      dispatch({ type: "SET_SUCCESS", payload: true });
      dispatch({ type: "SET_IS_SUBMITTING", payload: false });
      navigate("/");
    } catch (err) {
      dispatch({ type: "SET_ERR_MSG", payload: err.response.data.message });
      dispatch({ type: "SET_IS_SUBMITTING", payload: false });
      return;
    }
  };

  return (
    <>
      <div className="forgot-password-layout">
        <div className="forgot-password-layout__content">
          <div className="forgot-password-layout__content__header">
            <h1>Forgot Password</h1>
          </div>
          <form className="forgot-password-layout__content__form">
            <FormInput
              label="Email"
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              required={true}
              autoComplete="off"
            />
            <PasswordInput
              label="New Password"
              id="password"
              name="password"
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "SET_PWD", payload: e.target.value })
              }
              required={true}
              autoComplete="off"
            />
            <PasswordInput
              label="Confirm New Password"
              id="confirm-password"
              name="confirm-password"
              value={state.confirmPassword}
              onChange={(e) =>
                dispatch({ type: "SET_CONFIRM_PWD", payload: e.target.value })
              }
              required={true}
              autoComplete="off"
            />
          </form>
          <div className="forgot-password-layout__content__buttons">
            <button onClick={handleSubmit}>Reset Password</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
