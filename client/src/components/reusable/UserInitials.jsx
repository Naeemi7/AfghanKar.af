import PropTypes from "prop-types";
import "@styles/components/reusableComponents.scss";
import useUserContext from "@hooks/useUserContext";

export default function UserInitials({
  radius = 3.6,
  fontSize = 1.8,
  borderWidth = 0.5,
}) {
  const { isJobSeekerLoggedIn, jobSeeker, recruiter } = useUserContext();

  // Helper function to get initials from a full name
  const getInitials = (fullName) => {
    if (!fullName) return "";
    const [firstName, lastName] = fullName.split(" "); // Split by space to get first and last names
    const firstInitial = firstName?.charAt(0).toUpperCase() || "";
    const lastInitial = lastName?.charAt(0).toUpperCase() || "";
    return `${firstInitial}${lastInitial}`;
  };

  // Determine which user's initials to display
  const initials = isJobSeekerLoggedIn
    ? getInitials(jobSeeker?.fullName)
    : getInitials(recruiter?.fullName);

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
          {initials}
        </p>
      </div>
    </div>
  );
}

// Validate props
UserInitials.propTypes = {
  radius: PropTypes.number,
  fontSize: PropTypes.number,
  borderWidth: PropTypes.number,
};
