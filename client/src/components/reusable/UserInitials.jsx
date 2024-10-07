import PropTypes from "prop-types";
import "@styles/reusableComponents.scss";

export default function UserInitials({
  firstname,
  lastname,
  radius = 3.6,
  fontSize = 1.8,
  borderWidth = 0.5,
}) {
  // Extract the first letter of each name
  const firstInitial = firstname ? firstname.charAt(0).toUpperCase() : "";
  const lastInitial = lastname ? lastname.charAt(0).toUpperCase() : "";

  return (
    <div className="initials-container">
      <div
        className="initials-circle"
        style={{
          width: `${radius}rem`,
          height: `${radius}rem`,
          border: `${borderWidth}rem solid #4b2069`,
        }}
      >
        <p className="initials" style={{ fontSize: `${fontSize}rem` }}>
          {firstInitial + lastInitial}
        </p>
      </div>
    </div>
  );
}

UserInitials.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  radius: PropTypes.number,
  fontSize: PropTypes.number,
  borderWidth: PropTypes.number,
};
