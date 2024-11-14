import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useNavigation from "@hooks/useNavigation";
import SidebarAvatar from "./SidebarAvatar";
import Icon from "@reusable/Icon";
import ShowToast from "@reusable/Toast";
import useUserContext from "@hooks/useUserContext";
import { logError, handleError } from "@utils/errorUtils";

export default function Sidebar({
  links,
  avatarImage,
  avatarHeading,
  avatarParagraph,
}) {
  const logoutLink = links.find((link) => link.className === "logout-button");
  const otherLinks = links.filter((link) => link.className !== "logout-button");
  const hasToastShown = useRef(false);
  const { goTo } = useNavigation();
  const { isJobSeekerLoggedIn, logoutUser, setError } = useUserContext();

  // Unified logout handler
  const handleLogout = async () => {
    const userType = isJobSeekerLoggedIn ? "jobSeeker" : "recruiter";

    try {
      await logoutUser(userType);

      if (!hasToastShown.current) {
        ShowToast("Logged out successfully", "success");
        hasToastShown.current = true;
      }

      // Navigate to appropriate login page after delay
      const redirectUrl = isJobSeekerLoggedIn
        ? "/job-seeker-login"
        : "/recruiter-login";

      setTimeout(() => {
        goTo(redirectUrl);
      }, 1500);
    } catch (error) {
      if (!error.handled) {
        error.handled = true;
        logError("Logout failed", error);
        handleError(error, setError);
      }
    }
  };

  // Run the effect once when the component is mounted
  useEffect(() => {}, []);

  return (
    <nav className="sidebar-container" aria-label="Main Navigation">
      <SidebarAvatar
        avatarImage={avatarImage}
        avatarHeading={avatarHeading}
        avatarParagraph={avatarParagraph}
      />
      <ul className="sidebar-link-container">
        {otherLinks.map((link, index) => (
          <li key={index}>
            <Link to={link.to} className="sidebar-link">
              <Icon library={link.library} name={link.name} />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      {logoutLink && (
        <Link className="logout-button" onClick={handleLogout}>
          <Icon library={logoutLink.library} name={logoutLink.name} />
          <span>{logoutLink.label}</span>
        </Link>
      )}
    </nav>
  );
}

Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      library: PropTypes.string,
      name: PropTypes.string,
      className: PropTypes.string,
    })
  ).isRequired,
  avatarImage: PropTypes.string.isRequired,
  avatarHeading: PropTypes.string.isRequired,
  avatarParagraph: PropTypes.string.isRequired,
};
