import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <button type={props.type} onClick={props.function}>
      {props.name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  function: PropTypes.func,
};

export default Button;
