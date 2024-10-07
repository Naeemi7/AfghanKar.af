import PropTypes from "prop-types";
import "@styles/reusableComponents.scss";

const AlertBox = ({ message }) => {
  return <p className="alert-box">{message}</p>;
};

export default AlertBox;

AlertBox.propTypes = {
  message: PropTypes.string.isRequired,
};
