import { dotSpinner } from "ldrs";
import PropTypes from "prop-types";
import "@styles/components/reusableComponents.scss";

export default function LoadingIndicator({
  size = 40,
  speed = 0.8,
  color = "#d35400",
}) {
  dotSpinner.register();

  return (
    <div className="loading-container">
      <l-dot-spinner
        size={size}
        speed={speed}
        className="spinner"
        color={color}
      ></l-dot-spinner>
    </div>
  );
}

LoadingIndicator.propTypes = {
  size: PropTypes.number,
  speed: PropTypes.number,
  color: PropTypes.string,
};
