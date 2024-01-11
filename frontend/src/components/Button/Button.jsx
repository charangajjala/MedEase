import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <button type={props.type} onClick={props.onClick}>
      {props.name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
