import PropTypes from "prop-types";
import Icon from "@reusable/Icon";
import AuthLink from "@reusable/AuthLink";

export default function Header({ onPrevious }) {
  return (
    <div className="content-header">
      <div className="back-btn-container" onClick={onPrevious}>
        <Icon library="ti" name="TiArrowBack" size={24} className="back-icon" />
        <span className="back-text">Back</span>
      </div>

      <AuthLink
        message="Already have an account?"
        pathName="Login"
        pathUrl="/recruiter-login"
      />
    </div>
  );
}

Header.propTypes = {
  onPrevious: PropTypes.func,
};
