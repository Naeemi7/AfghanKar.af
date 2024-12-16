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
import { post } from "@api/express/apiService";
import ShowToast from "@reusable/ShowToast";
import formFields from "@data/registration/job-seeker/job-seeker-registration-data";
import { logBuddy, logError, handleError } from "@utils/errorUtils";
import LoadingIndicator from "@reusable/LoadingIndicator";

const JobSeekerRegistration = () => {
  const [passwordMatched, setPasswordMatched] = useState(true);
  const { goTo } = useNavigation();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const { error, setError, loading, setLoading } = useUserContext();

  /**
   * Handles the registration
   * @param {*} e
   * @returns
   */
  const handleRegistration = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      fullName: formData.get("fullName"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (data.password !== formData.get("confirm-password")) {
      setPasswordMatched(false);
      return;
    }

    setPasswordMatched(true);
    setError("");
    setLoading(true);

    try {
      const response = await post("/job-seeker/register", data, setError);
      logBuddy("Registration response: ", response);
      ShowToast("Registered successfully!", "success");

      setLoading(true); // Ensure spinner is visible during navigation
      goTo("/job-seeker-login");
    } catch (err) {
      if (!err.handled) {
        handleError(err, setError);
        logError("Registration error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-seeker-registration-container">
      {loading ? (
        <LoadingIndicator size={60} />
      ) : (
        <>
          <h2>Job Seeker Registration</h2>
          <form onSubmit={handleRegistration}>
            {formFields(showPassword).map(
              ({ labelName, type, name, placeholder, required }) => (
                <div
                  key={name}
                  className={name.includes("password") ? "password-input" : ""}
                >
                  <Input
                    labelName={labelName}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    autoComplete="new-password"
                  />
                  {name.includes("password") && (
                    <Icon
                      library="fa"
                      name={showPassword ? "FaEyeSlash" : "FaEye"}
                      className="hide-and-show-pass"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              )
            )}

            {!passwordMatched && (
              <AlertBox message="Passwords do not match." type="error" />
            )}
            {error && <AlertBox message={error} type="error" />}

            <Button name="Register" type="submit" />
            <AuthLink
              message="Already signed up? "
              pathName="Login"
              pathUrl="/job-seeker-login"
            />
          </form>
        </>
      )}
    </div>
  );
};
export default JobSeekerRegistration;
