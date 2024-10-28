import { useState } from "react";
import "@styles/components/job-seeker-registration.scss";
import Input from "@reusable/Input";
import Button from "@reusable/Button";
import Icon from "@reusable/Icon";
import AuthLink from "@reusable/AuthLink";
import usePasswordVisibility from "@hooks/usePasswordVisibility";
import AlertBox from "@reusable/AlertBox";
import formFields from "@data/registration/job-seeker-registration";

const JobSeekerRegistration = () => {
  const [passwordMatched, setPasswordMatched] = useState(true);
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  return (
    <div className="job-seeker-registeration-container">
      <h2>Job Seeker Registration</h2>

      <form>
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

        {!passwordMatched && <AlertBox message="Passwords do not match." />}
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
