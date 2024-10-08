import PropTypes from "prop-types";
import "@styles/reusableComponents.scss";

export default function AlertBox({ message }) {
  return <p className="alert-box">{message}</p>;
}

AlertBox.propTypes = {
  message: PropTypes.string.isRequired,
};
