import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useNavigation from "@hooks/useNavigation";
import SidebarAvatar from "./SidebarAvatar";
import Icon from "@reusable/Icon";
import ShowToast from "@reusable/Toast";
import { get } from "@api/apiService";
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
  const { setError } = useUserContext();

  const handleLogout = async () => {
    try {
      await get("/job-seeker/logout");
      localStorage.removeItem("jobSeeker");

      if (!hasToastShown.current) {
        ShowToast("Logged out successfully", "success");
        hasToastShown.current = true;
      }

      // Navigate to login page after delay
      setTimeout(() => {
        goTo("/job-seeker-login");
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
        <Link
          to={logoutLink.to}
          className="logout-button"
          onClick={handleLogout}
        >
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
