import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "@reusable/Icon";

export default function DropdownItems({ item }) {
  const { to, className, library, name, size, label, onClick } = item;

  const handleClick = (event) => {
    if (onClick) {
      event.preventDefault(); // Prevent default navigation if onClick is defined
      onClick();
    }
  };

  return to ? (
    <Link to={to} className="dropdown-link-items" onClick={handleClick}>
      <li className={className}>
        <Icon
          library={library}
          name={name}
          size={size}
          className="dropdown-icon"
        />
        {label}
      </li>
    </Link>
  ) : (
    <li
      className={`dropdown-link-items ${className}`}
      onClick={handleClick}
      role="button"
    >
      <Icon
        library={library}
        name={name}
        size={size}
        className="dropdown-icon"
      />
      {label}
    </li>
  );
}

DropdownItems.propTypes = {
  item: PropTypes.shape({
    to: PropTypes.string,
    className: PropTypes.string,
    library: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }).isRequired,
};
