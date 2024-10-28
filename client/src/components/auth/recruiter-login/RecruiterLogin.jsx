import PropTypes from "prop-types";
import UserLogin from "@reusable/UserLogin";

export default function RecruiterLogin({ loginRecruiter }) {
  return (
    <UserLogin
      heading="Recruiter Login"
      loginUser={loginRecruiter}
      registerPathUrl="/recruiter-registration"
    />
  );
}

RecruiterLogin.propTypes = {
  loginRecruiter: PropTypes.func.isRequired,
};
