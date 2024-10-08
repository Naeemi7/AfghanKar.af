import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "@reusable/Icon";

export default function DropdownItems({ item }) {
  return (
    <Link to={item.to} className="dropdown-link-items">
      <li className={item.className}>
        <Icon
          library={item.library}
          name={item.name}
          size={item.size}
          className="dropdown-icon"
        />
        {item.label}
      </li>
    </Link>
  );
}

DropdownItems.propTypes = {
  item: PropTypes.shape({
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    library: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};
