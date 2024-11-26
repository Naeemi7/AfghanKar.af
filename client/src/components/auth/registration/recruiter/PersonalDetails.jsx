import { useState } from "react";
import PropTypes from "prop-types";
import personalDetails from "@data/registration/recruiter/personalDetails";
import Input from "@reusable/Input";
import Icon from "@reusable/Icon";
import AlertBox from "@reusable/AlertBox";
import Button from "@reusable/Button";
import usePasswordVisibility from "@hooks/usePasswordVisibility";
import useUserContext from "@hooks/useUserContext";
import { logBuddy } from "@utils/errorUtils";

export default function PersonalDetails({ onNext }) {
  const [passwordMatched, setPasswordMatched] = useState(true);
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const { error, setError } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const personalData = {
      fullName: formData.get("fullName"),
      position: formData.get("position"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const confirmedPassword = formData.get("confirm-password");

    // Password mismatch check
    if (personalData.password !== confirmedPassword) {
      setPasswordMatched(false);
      return;
    }

    setPasswordMatched(true);
    setError("");

    onNext(personalData); // Pass collected data to parent
    logBuddy("Personal Details:", personalData);
  };

  return (
    <div className="personal-details-container">
      <h1>Personal Details</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        {personalDetails(showPassword).map((field, index) => (
          <div
            key={index}
            className={field.name.includes("password") ? "password-input" : ""}
          >
            <Input
              labelName={field.labelName}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
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

        <Button
          name="Next"
          type="submit" // changed from "button" to "submit"
          iconLibrary="gr"
          iconName="GrFormNextLink"
        />
      </form>
    </div>
  );
}

PersonalDetails.propTypes = {
  onNext: PropTypes.func.isRequired,
};
