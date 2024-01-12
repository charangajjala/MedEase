import PropTypes from "prop-types";
import React from "react";
import "./FormInput.scss";

const FormInput = React.forwardRef(function FormInput(
  { label, type, id, name, value, onChange, required, error, ...props },
  ref
) {
  return (
    <div className="grid-item">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        ref={ref}
        className={error ? 'input-error' : ''}
        {...props}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
});

FormInput.displayName = "FormInput";

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

FormInput.defaultProps = {
  type: "text",
  required: false,
  onChange: () => {},
  error: "",
};

export default FormInput;
