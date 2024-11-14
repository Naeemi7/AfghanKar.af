// UserLogin.jsx
import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import "@styles/components/user-login.scss";
import useNavigation from "@hooks/useNavigation";
import usePasswordVisibility from "@hooks/usePasswordVisibility";
import Input from "@reusable/Input";
import Button from "@reusable/Button";
import Icon from "@reusable/Icon";
import AlertBox from "@reusable/AlertBox";
import AuthLink from "@reusable/AuthLink";
import ShowToast from "@reusable/ShowToast";
import { logBuddy, handleError } from "@utils/errorUtils";

export default function UserLogin({
  heading,
  loginUser,
  registerPathUrl,
  goToUrl,
}) {
  const { goTo } = useNavigation();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const [error, setError] = useState("");

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      setError("");
      try {
        await loginUser(data);
        logBuddy(`${heading} login successful`, data);
        ShowToast("Logged in successfully!", "success");
        setTimeout(() => goTo(goToUrl), 1500);
      } catch (error) {
        if (!error.handled) {
          error.handled = true;
          handleError(error, setError);
        }
      }
    },
    [goTo, loginUser, heading, goToUrl]
  );

  return (
    <div className="user-login-container">
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
    </div>
  );
}

UserLogin.propTypes = {
  heading: PropTypes.string,
  loginUser: PropTypes.func,
  registerPathUrl: PropTypes.string,
  goToUrl: PropTypes.string,
};
