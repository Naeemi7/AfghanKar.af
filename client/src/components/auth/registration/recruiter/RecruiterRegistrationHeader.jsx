import Icon from "@reusable/Icon";
import AuthLink from "@reusable/AuthLink";

export default function RecruiterRegistrationHeader() {
  return (
    <div className="content-header">
      <div className="back-btn-container">
        <Icon
          library="io"
          name="IoMdArrowRoundBack"
          size={20}
          className="back-icon"
        />
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
