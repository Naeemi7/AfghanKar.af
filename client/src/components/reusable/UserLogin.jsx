import PropTypes from "prop-types";
import { useCallback } from "react";
import "@styles/components/user-login.scss";
import useNavigation from "@hooks/useNavigation";
import usePasswordVisibility from "@hooks/usePasswordVisibility";
import useUserContext from "@hooks/useUserContext";
import Input from "@reusable/Input";
import Button from "@reusable/Button";
import Icon from "@reusable/Icon";
import AlertBox from "@reusable/AlertBox";
import AuthLink from "@reusable/AuthLink";
import ShowToast from "@reusable/ShowToast";
import LoadingIndicator from "@reusable/LoadingIndicator";
import { logBuddy, handleError } from "@utils/errorUtils";

export default function UserLogin({
  heading,
  loginUser,
  registerPathUrl,
  goToUrl,
  userType,
}) {
  const { goTo } = useNavigation();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const { error, setError, loading, setLoading } = useUserContext();

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");

      // Adjust the payload structure based on userType
      const data =
        userType === "recruiter"
          ? { personalDetails: { email, password } }
          : { email, password };

      setError("");
      setLoading(true); // Start loading spinner
      try {
        await loginUser(data);
        logBuddy(`${heading} login successful`, data);
        ShowToast("Logged in successfully!", "success");

        // Ensure spinner is visible during navigation
        setLoading(true);
        await goTo(goToUrl);
      } catch (error) {
        if (!error.handled) {
          error.handled = true;
          handleError(error, setError);
        }
      } finally {
        setLoading(false); // Stop loading spinner
      }
    },
    [goTo, loginUser, heading, goToUrl, userType, setError, setLoading]
  );

  return (
    <div className="user-login-container">
      {loading ? (
        <LoadingIndicator size={60} />
      ) : (
        <div className="user-login-wrapper">
          <h2>{heading}</h2>
          <form onSubmit={handleLogin}>
            <Input
              labelName="Email *"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
            <div className="password-input">
              <Input
                labelName="Password *"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
              />
              <Icon
                library="fa"
                name={showPassword ? "FaEyeSlash" : "FaEye"}
                className="hide-and-show-pass"
                onClick={togglePasswordVisibility}
              />
            </div>
            {error && <AlertBox message={error} />}
            <Button name="Login" type="submit" />
            <AuthLink
              message="No account yet?"
              pathName="Register"
              pathUrl={registerPathUrl}
            />
          </form>
        </div>
      )}
    </div>
  );
}

UserLogin.propTypes = {
  heading: PropTypes.string,
  loginUser: PropTypes.func.isRequired,
  registerPathUrl: PropTypes.string.isRequired,
  goToUrl: PropTypes.string.isRequired,
  userType: PropTypes.oneOf(["recruiter", "jobSeeker"]).isRequired,
};
