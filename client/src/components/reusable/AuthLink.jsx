import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export default function AuthLink({
  message = "",
  pathName = "",
  pathUrl = "",
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(pathUrl);
  };

  const linkStyle = {
    color: "#712c9c",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  };

  const hoverStyle = {
    color: "#4b2069",
  };

  return (
    <div className="navigator-container">
      <p>
        {message}{" "}
        <Link
          to={pathUrl}
          onClick={handleClick}
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
