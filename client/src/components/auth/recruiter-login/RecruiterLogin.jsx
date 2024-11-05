import PropTypes from "prop-types";
import UserLogin from "@reusable/UserLogin";
import useUserContext from "@hooks/useUserContext";

export default function RecruiterLogin() {
  const { loginRecruiter } = useUserContext();

  return (
    <UserLogin
      heading="Recruiter Login"
      loginUser={loginRecruiter}
      registerPathUrl="/recruiter-registration"
      goToUrl="/recruiter-dashboard"
    />
  );
}

RecruiterLogin.propTypes = {
  loginRecruiter: PropTypes.func,
};
