import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "@reusable/Icon";

export default function NavLink({ items, onClick }) {
  return (
    <div className="nav-links">
      {items.map((item) => (
        <Link
          to={item.path}
          className="nav-item"
          key={item.path}
          onClick={onClick}
        >
          <Icon
            library={item.icon.library}
            name={item.icon.name}
            size={item.icon.size}
            className="nav-icon"
          />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

// Validating the props
NavLink.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.shape({
        library: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func,
};
