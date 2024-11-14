import Icon from "@reusable/Icon";
import AuthLink from "@reusable/AuthLink";
import { goTo } from "@hooks/useNavigation";

export default function RecruiterRegistrationHeader() {
  const handleNavigation = () => {
    goTo("/");
  };

  return (
    <div className="content-header">
      <div className="back-btn-container" onClick={handleNavigation}>
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
