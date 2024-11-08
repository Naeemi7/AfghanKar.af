import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "@images/navbar/logo3.png";

export default function Logo({ height, width }) {
  const logoStyle = {
    height: `${height}rem`,
    width: `${width}rem`,
  };
  return (
    <div className="logo-container">
      <Link to="/">
        <img src={logo} alt="AfghanKar.af logo" style={logoStyle} />
      </Link>
    </div>
  );
}

Logo.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};
