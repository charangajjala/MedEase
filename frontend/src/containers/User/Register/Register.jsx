import { Button, FormInput, Footer } from "../../../components";
import "./Register.scss";

const Register = () => {
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
              required
              autoComplete="off"
            />
            <FormInput
              label="Email"
              type="email"
              id="email"
              name="email"
              required
              autoComplete="off"
            />
            <FormInput
              label="Password"
              type="password"
              id="password"
              name="password"
              required
              autoComplete="off"
            />
            <FormInput
              label="Confirm Password"
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
              autoComplete="off"
            />
          </div>
          <div className="register-layout__content__button">
            <Button name="Register" type="submit" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
