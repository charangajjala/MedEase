import "./Loading.scss";
import PropTypes from "prop-types";

const Loading = ({ message }) => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
