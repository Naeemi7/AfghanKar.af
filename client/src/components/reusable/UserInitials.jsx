import PropTypes from "prop-types";
import "@styles/components/reusableComponents.scss";

export default function UserInitials({
  firstname = "",
  lastname = "",
  radius = 3.6,
  fontSize = 1.8,
  borderWidth = 0.5,
}) {
  // Extract the first letter of each name, defaulting to empty string if names are not provided
  const firstInitial = firstname.charAt(0).toUpperCase();
  const lastInitial = lastname.charAt(0).toUpperCase();

  // Compute styles once and use them for inline styling
  const circleStyles = {
    width: `${radius}rem`,
    height: `${radius}rem`,
    border: `${borderWidth}rem solid #e67e22`,
  };

  const textStyles = {
    fontSize: `${fontSize}rem`,
    color: "white", // Ensure font color is white
  };

  return (
    <div className="initials-container">
      <div className="initials-circle" style={circleStyles}>
        <p className="initials" style={textStyles}>
          {firstInitial}
          {lastInitial}
        </p>
      </div>
    </div>
  );
}

// Validate props
UserInitials.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  radius: PropTypes.number,
  fontSize: PropTypes.number,
  borderWidth: PropTypes.number,
};
