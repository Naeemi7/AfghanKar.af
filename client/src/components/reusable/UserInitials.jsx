import PropTypes from "prop-types";
import "@styles/components/reusableComponents.scss";
import useUserContext from "@hooks/useUserContext";

export default function UserInitials({
  radius = 3.6,
  fontSize = 1.8,
  borderWidth = 0.5,
}) {
  const { isJobSeekerLoggedIn, jobSeeker, recruiter } = useUserContext();

  let firstInitial = "";
  let lastInitial = "";

  // Ensure firstName and lastName exist before accessing their charAt method
  if (isJobSeekerLoggedIn && jobSeeker?.firstName && jobSeeker?.lastName) {
    firstInitial = jobSeeker.firstName.charAt(0).toUpperCase();
    lastInitial = jobSeeker.lastName.charAt(0).toUpperCase();
  } else if (recruiter?.firstName && recruiter?.lastName) {
    firstInitial = recruiter.firstName.charAt(0).toUpperCase();
    lastInitial = recruiter.lastName.charAt(0).toUpperCase();
  }

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
  radius: PropTypes.number,
  fontSize: PropTypes.number,
  borderWidth: PropTypes.number,
};
