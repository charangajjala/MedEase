import PropTypes from "prop-types";
import React, { useState } from "react";
import "./ImageInput.scss";
import toast from "react-hot-toast";

const ImageInput = React.forwardRef(function ImageInput(
  { label, id, name, onChange, required, error, ...props },
  ref
) {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      toast.success("Image uploaded successfully");
    } else if (file) {
      toast.error("Please select an image file");
    }
    onChange(e);
  };

  return (
    <div className="image-input-wrapper">
      <label htmlFor={id} className="image-label">
        {label}
      </label>
      <input
        type="file"
        id={id}
        name={name}
        onChange={handleImageChange}
        required={required}
        ref={ref}
        className={`image-field ${error ? "error" : ""}`}
        accept="image/*"
        {...props}
      />
      {preview && (
        <img src={preview} alt="Preview" className="image-preview-display" />
      )}
      {error && <div className="image-error-message">{error}</div>}
    </div>
  );
});

ImageInput.displayName = "ImageInput";

ImageInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

ImageInput.defaultProps = {
  required: false,
  onChange: () => {},
  error: "",
};

export default ImageInput;
