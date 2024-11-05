import PropTypes from "prop-types";
import UserLogin from "@reusable/UserLogin";
import useUserContext from "@hooks/useUserContext";

export default function JobSeekerLogin() {
  const { loginJobSeeker } = useUserContext();

  return (
    <UserLogin
      heading="Job Seeker Login"
      loginUser={loginJobSeeker}
      registerPathUrl="/job-seeker-registration"
      goToUrl="job-seeker-dashboard"
    />
  );
}

JobSeekerLogin.propTypes = {
  loginJobSeeker: PropTypes.func,
};
