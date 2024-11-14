import Icon from "@reusable/Icon";
import AuthLink from "@reusable/AuthLink";
import useNavigation from "@hooks/useNavigation";
// import { goTo } from "@hooks/useNavigation";

export default function Header() {
  const { goTo } = useNavigation();

  return (
    <div className="content-header">
      <div className="back-btn-container" onClick={() => goTo("/")}>
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
