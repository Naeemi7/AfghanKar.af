import useNavigation from "@hooks/useNavigation";
import "@styles/components/user-login.scss";
import Input from "@reusable/Input";
import Button from "@reusable/Button";
import Icon from "@reusable/Icon";
import AlertBox from "@reusable/AlertBox";
import AuthLink from "@reusable/AuthLink";
import usePasswordVisibility from "@hooks/usePasswordVisibility";
import useUserContext from "@hooks/useUserContext";
import { logBuddy, handleError } from "@utils/errorUtils";
import ShowToast from "@reusable/Toast";

const UserLogin = () => {
  const { goTo } = useNavigation();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const { loginUser, error, setError } = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    setError(""); // Clear previous error before login attempt

    try {
      await loginUser(data);
      logBuddy("Logged in successfully", data);
      ShowToast("Logged in successfully!", "success");

      setTimeout(() => {
        goTo("/home");
      }, 1500);
    } catch (error) {
      // Ensure handleError is called only once and does not cause multiple toasts
      if (!error.handled) {
        error.handled = true;
        handleError(error, setError);
      }
    }
  };

  return (
    <div className="user-login-container">
      <div className="user-login-wrapper">
        <h2>User Login</h2>
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
            pathUrl="/user-registration"
          />
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
