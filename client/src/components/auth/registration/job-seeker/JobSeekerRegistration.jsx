import { useState } from "react";
import "@styles/components/job-seeker-registration.scss";
import Input from "@reusable/Input";
import Button from "@reusable/Button";
import Icon from "@reusable/Icon";
import AuthLink from "@reusable/AuthLink";
import usePasswordVisibility from "@hooks/usePasswordVisibility";
import useNavigation from "@hooks/useNavigation";
import useUserContext from "@hooks/useUserContext";
import AlertBox from "@reusable/AlertBox";
import { post } from "@api/apiService";
import ShowToast from "@reusable/ShowToast";
import formFields from "@data/registration/job-seeker-registration";
import { logBuddy, logError, handleError } from "@utils/errorUtils";

const JobSeekerRegistration = () => {
  const [passwordMatched, setPasswordMatched] = useState(true);
  const { goTo } = useNavigation();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const { error, setError } = useUserContext();

  const handleRegistration = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const confirmedPassword = formData.get("confirm-password");

    if (data.password !== confirmedPassword) {
      setPasswordMatched(false);
      return;
    } else {
      setPasswordMatched(true);
    }

    setError(""); // Clear previous errors before registration attempt

    try {
      const response = await post("/job-seeker/register", data, setError);
      logBuddy("Registration response: ", response);
      ShowToast("Registered successfully!", "success");

      // Redirect to login page after a short delay
      setTimeout(() => {
        goTo("/job-seeker-login");
      }, 1500);
    } catch (err) {
      // Ensure handleError is called only once and doesn't cause multiple toasts
      if (!err.handled) {
        err.handled = true;
        handleError(err, setError);
        logError("Registration error:", err);
      }
    }
  };

  return (
    <div className="job-seeker-registration-container">
      <h2>Job Seeker Registration</h2>

      <form onSubmit={handleRegistration}>
        {formFields(showPassword).map((field, index) => (
          <div
            key={index}
            className={field.name.includes("password") ? "password-input" : ""}
          >
            <Input
              labelName={field.labelName}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required
            />
            {field.name.includes("password") && (
              <Icon
                library="fa"
                name={showPassword ? "FaEyeSlash" : "FaEye"}
                className="hide-and-show-pass"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
        ))}

        {!passwordMatched && (
          <AlertBox message="Passwords do not match." type="error" />
        )}
        {error && <AlertBox message={error} type="error" />}

        <Button name="Register" type="submit" />

        <AuthLink
          message="Already signed up? "
          pathName="Login"
          pathUrl="/user-login"
        />
      </form>
    </div>
  );
};

export default JobSeekerRegistration;