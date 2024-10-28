import PropTypes from "prop-types";
import UserLogin from "@reusable/UserLogin";

export default function JobSeekerLogin({ loginJobSeeker }) {
  return (
    <UserLogin
      heading="Job Seeker Login"
      loginUser={loginJobSeeker}
      registerPathUrl="/user-registeration"
    />
  );
}

JobSeekerLogin.propTypes = {
  loginJobSeeker: PropTypes.func.isRequired,
};
