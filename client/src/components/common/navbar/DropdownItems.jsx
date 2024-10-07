import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "@reusable/Icon";

const DropdownItems = ({ item }) => {
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
};

DropdownItems.propTypes = {
  item: PropTypes.object.isRequired,
};

export default DropdownItems;
