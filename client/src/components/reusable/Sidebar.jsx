import { useLogoutButton } from "@hooks/useLogoutButton";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SidebarAvatar from "./SidebarAvatar";
import Icon from "@reusable/Icon";

export default function Sidebar({
  links,
  avatarImage,
  avatarHeading,
  avatarParagraph,
}) {
  const logoutLink = links.find((link) => link.className === "logout-button");
  const otherLinks = links.filter((link) => link.className !== "logout-button");

  // Use the custom hook for logout logic
  const handleLogout = useLogoutButton();

  return (
    <nav className="sidebar-container" aria-label="Main Navigation">
      <SidebarAvatar
        avatarImage={avatarImage}
        avatarHeading={avatarHeading}
        avatarParagraph={avatarParagraph}
      />
      <ul className="sidebar-link-container">
        {otherLinks.map(({ to, library, name, label }) => (
          <li key={name}>
            <Link to={to} className="sidebar-link">
              <Icon library={library} name={name} />
              <span>{label}</span>
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
