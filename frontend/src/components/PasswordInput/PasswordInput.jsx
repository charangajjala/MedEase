import { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "../FormInput/FormInput";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PasswordInput.scss";

const PasswordInput = ({ id, label, value, onChange, error, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="password-field">
      <FormInput
        label={label}
        type={isPasswordVisible ? "text" : "password"}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        error={error}
        {...props}
      />
      <FontAwesomeIcon
        icon={isPasswordVisible ? faEyeSlash : faEye}
        onClick={togglePasswordVisibility}
        className="password-toggle-icon"
      />
    </div>
  );
};

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default PasswordInput;
