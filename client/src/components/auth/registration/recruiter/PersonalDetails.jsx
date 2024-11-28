import { useState } from "react";
import PropTypes from "prop-types";
import personalDetailsConfig from "@data/registration/recruiter/personalDetails";
import Input from "@reusable/Input";
import Icon from "@reusable/Icon";
import AlertBox from "@reusable/AlertBox";
import Button from "@reusable/Button";
import usePasswordVisibility from "@hooks/usePasswordVisibility";
import useUserContext from "@hooks/useUserContext";
import { logBuddy } from "@utils/errorUtils";
import useFormValidation from "@hooks/useFormValidation";
export default function PersonalDetails({ onNext }) {
  const [passwordMatched, setPasswordMatched] = useState(true);
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const { error, setError } = useUserContext();

  const formFields = [
    "fullName",
    "email",
    "position",
    "phoneNumber",
    "password",
  ];
  const includePasswordValidation = formFields.includes("password");
  // Custom hook only for required field validation
  const { validateForm } = useFormValidation(formFields, setError);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const personalDetails = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      position: formData.get("position"),
      phoneNumber: formData.get("phoneNumber"),
      password: formData.get("password"),
    };
    const confirmedPassword = formData.get("confirm-password");

    // Validate required fields
    if (!validateForm(formData)) return;

    // Password matching validation
    if (
      includePasswordValidation &&
      personalDetails.password !== confirmedPassword
    ) {
      setPasswordMatched(false);
      return;
    }
    setPasswordMatched(true); // Reset password match state
    setError(""); // Reset error state

    onNext(personalDetails); // Pass collected data to parent
    logBuddy("Personal Details:", personalDetails);
  };

  return (
    <div className="personal-details-container">
      <h1>Personal Details</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        {personalDetailsConfig(showPassword).map((field, index) => (
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
          type="submit"
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
