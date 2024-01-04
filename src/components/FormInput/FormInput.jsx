import PropTypes from "prop-types";

const FormInput = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  required,
  ...props
}) => {
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
        {...props}
      />
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
};

FormInput.defaultProps = {
  type: "text",
  required: false,
  onChange: () => {},
};

export default FormInput;