import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "@reusable/Icon";
import ShowToast from "@reusable/Toast";

export default function LogoutButton({
  label = "Logout",
  icon,
  className,
  userType,
  logoutJobSeeker,
  logoutRecruiter,
}) {
  const navigate = useNavigate();

  // Determine the logout function based on user type
  const handleLogout = async () => {
    try {
      if (userType === "jobSeeker") {
        await logoutJobSeeker();
        ShowToast("Successfully logged out!", "success");
        // Navigate to home page after logout
        navigate("/");
      } else if (userType === "recruiter") {
        await logoutRecruiter();
        ShowToast("Successfully logged out!", "success");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      ShowToast("Logout failed. Please try again.", "error");
    }
  };

  return (
    <button
      type="button"
      className={`logout-button ${className}`}
      onClick={handleLogout}
      aria-label="Logout"
    >
      {icon && (
        <Icon
          library={icon.library}
          name={icon.name}
          size={icon.size}
          className="logout-icon"
        />
      )}
      <span>{label}</span>
    </button>
  );
}

// PropTypes validation
LogoutButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.shape({
    library: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
  }),
  className: PropTypes.string,
  userType: PropTypes.string.isRequired,
  logoutJobSeeker: PropTypes.func.isRequired,
  logoutRecruiter: PropTypes.func.isRequired,
};
