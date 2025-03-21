import { useState } from "react";
import PropTypes from "prop-types";
import personalDetails from "@data/registration/recruiter/personalDetails";
import Input from "@reusable/Input";
import Icon from "@reusable/Icon";
import AlertBox from "@reusable/AlertBox";
import Button from "@reusable/Button";
import usePasswordVisibility from "@hooks/usePasswordVisibility";
import useUserContext from "@hooks/useUserContext";
import useFormValidation from "@hooks/useFormValidation";

export default function PersonalDetails({ onNext }) {
  const [passwordMatched, setPasswordMatched] = useState(true);
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const { error, setError } = useUserContext();

  // Form fields
  const formFields = [
    "fullName",
    "email",
    "position",
    "phoneNumber",
    "password",
  ];

  // formFileds & setError are passed as props
  const { validateForm } = useFormValidation(formFields, setError);
  const includePasswordValidation = formFields.includes("password");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const personalData = {
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
      personalData.password !== confirmedPassword
    ) {
      setPasswordMatched(false);
      return;
    }

    // Reset password match state
    setPasswordMatched(true);
    // Reset error state
    setError("");

    // Pass collected data to parent
    onNext(personalData);
  };

  return (
    <div className="personal-details-container">
      <h1>Personal Details</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        {personalDetails(showPassword).map(
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
