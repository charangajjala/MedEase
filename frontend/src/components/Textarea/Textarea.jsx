import React from "react";
import PropTypes from "prop-types";
import "./Textarea.scss";

const Textarea = React.forwardRef(function Textarea(
  { label, id, name, value, onChange, required, ...props },
  ref
) {
  return (
    <div className="grid-item">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        ref={ref}
        {...props}
      />
    </div>
  );
});

Textarea.displayName = "Textarea";

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
};

export default Textarea;
