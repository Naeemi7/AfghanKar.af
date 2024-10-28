import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function AuthLink({
  message = "",
  pathName = "",
  pathUrl = "",
}) {
  const linkStyle = {
    color: "#006699",
    fontWeight: "bold",
    transition: "color 0.3s ease",
    padding: "0.6rem",
  };

  const hoverStyle = {
    color: "#003f57",
  };

  return (
    <div className="navigator-container">
      <p>
        {message}{" "}
        <Link
          to={pathUrl}
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
          onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
        >
          {pathName}
        </Link>
      </p>
    </div>
  );
}

AuthLink.propTypes = {
  message: PropTypes.string,
  pathName: PropTypes.string,
  pathUrl: PropTypes.string,
};
