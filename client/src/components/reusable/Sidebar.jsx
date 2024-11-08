import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "@styles/components/sidebar.scss";
import SidebarAvatar from "./SidebarAvatar";
import Icon from "@reusable/Icon";

export default function Sidebar({
  links,
  avatarImage,
  avatarHeading,
  avatarParagraph,
}) {
  return (
    <nav className="sidebar-container" aria-label="Main Navigation">
      <SidebarAvatar
        avatarImage={avatarImage}
        avatarHeading={avatarHeading}
        avatarParagraph={avatarParagraph}
      />
      <ul className="sidebar-link-container">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.to}
              className={link.clasName ? `logout-button` : `sidebar-link`}
            >
              <Icon library={link.library} name={link.name} />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
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
    })
  ).isRequired,
  avatarImage: PropTypes.string.isRequired,
  avatarHeading: PropTypes.string.isRequired,
  avatarParagraph: PropTypes.string.isRequired,
};
