import { useReducer } from "react";
import { PasswordInput } from "../../components";
import "./ForgotPassword.scss";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Endpoints from "../../constants/endpoints";
import { toast } from "react-hot-toast";

const initialValues = {
  password: "",
  confirmPassword: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "SET_CONFIRM_PASSWORD":
      return {
        ...state,
        confirmPassword: action.payload,
      };
    default:
      return state;
  }
};

const ForgotPassword = () => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.post(Endpoints.FORGOT_PASSWORD_URL, {
        email: auth.email,
        password: state.password,
      });
      toast.success("Password Changed Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="forgot-password-page">
      <h1>Forgot Password</h1>

      <section className="form">
        <form>
          <PasswordInput
            id="password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
            label="New Password"
            placeholder="Enter New Password"
          />
          <PasswordInput
            id="confirmPassword"
            value={state.confirmPassword}
            onChange={(e) =>
              dispatch({
                type: "SET_CONFIRM_PASSWORD",
                payload: e.target.value,
              })
            }
            label="Confirm Password"
            placeholder="Confirm Password"
          />
        </form>
      </section>
      <section className="form-buttons">
        <button onClick={handleSubmit}>Submit</button>
      </section>
    </div>
  );
};

export default ForgotPassword;
