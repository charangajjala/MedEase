import { useReducer } from "react";
import { Button, FormInput, Footer, PasswordInput } from "../../../components";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
import endpoints from "../../../constants/endpoints";
import toast, { Toaster } from "react-hot-toast";
import RedirectToast from "../../../utils/RedirectToast";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "USER",
  errMsg: "",
  success: false,
  isSubmitting: false,
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
    case "SET_IS_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    default:
      return state;
  }
}

const Register = () => {
  const [
    { username, password, confirmPassword, email, isSubmitting },
    dispatch,
  ] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const redirectDuration = 4000;

  const handleRedirect = () => {
    toast(
      () => (
        <RedirectToast duration={redirectDuration} message="Succesful Login! Redirecting" />
      ),
      {
        duration: redirectDuration,
      }
    );

    setTimeout(() => {
      navigate("/");
    }, redirectDuration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      const message = "Please fill in all fields.";
      dispatch({ type: "SET_ERR_MSG", payload: message });
      toast.error(message);
      return;
    }

    if (password !== confirmPassword) {
      const message = "Passwords do not match!";
      dispatch({ type: "SET_ERR_MSG", payload: message });
      toast.error(message);
      return;
    }

    try {
      const response = await axiosPrivate.post(endpoints.REGISTER, {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        dispatch({ type: "SET_IS_SUBMITTING", payload: true });
        handleRedirect();
        dispatch({ type: "SET_SUCCESS", payload: true });
      } else {
        dispatch({ type: "SET_IS_SUBMITTING", payload: false });
        const message = response.data.message || "Registration failed";
        dispatch({ type: "SET_ERR_MSG", payload: message });
        toast.error(message);
      }
    } catch (error) {
      dispatch({ type: "SET_IS_SUBMITTING", payload: false });
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      dispatch({
        type: "SET_ERR_MSG",
        payload: message,
      });
      toast.error(message);
    }
  };

  return (
    <>
      <div className="register-layout">
        <Toaster position="bottom-right" reverseOrder={false} />
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
            <PasswordInput
              id="password"
              label="Password"
              onChange={(e) =>
                dispatch({ type: "SET_PWD", payload: e.target.value })
              }
              required={true}
              autoComplete="off"
              disabled={isSubmitting}
            />
            <PasswordInput
              id="confirm-password"
              label="Confirm Password"
              onChange={(e) =>
                dispatch({ type: "SET_CONFIRM_PWD", payload: e.target.value })
              }
              required={true}
              autoComplete="off"
              disabled={isSubmitting}
            />
          </form>
          <div className="register-layout__content__button">
            <Button type="submit" name="Register" onClick={handleSubmit} />
          </div>
        </div>
        {/* {errMsg && <span className="error-message">{errMsg}</span>} */}
      </div>
      <Footer />
    </>
  );
};

export default Register;
