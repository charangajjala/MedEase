import PropTypes from "prop-types";
import "./SelectField.scss"; // Add styles as needed

const SelectField = ({
  label,
  id,
  name,
  options,
  value,
  onChange,
  required,
  disabled,
  ...props
}) => {
  return (
    <div className="grid-item">
      {label && id && (
        <label className="select-label" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        {...props}
      >
        <option value="">Please select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

SelectField.defaultProps = {
  required: false,
  disabled: false,
};

export default SelectField;
