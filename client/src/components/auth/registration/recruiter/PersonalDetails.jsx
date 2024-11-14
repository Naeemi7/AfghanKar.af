import { useState } from "react";
import personalDetails from "@data/registration/recruiter-registration-data";
import Input from "@reusable/Input";
import Icon from "@reusable/Icon";
import AlertBox from "@reusable/AlertBox";
import Button from "@reusable/Button";
import usePasswordVisibility from "@hooks/usePasswordVisibility";

const PersonalDetails = ({ onNext }) => {
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // To store general errors
  const [passwordMatched, setPasswordMatched] = useState(true); // To check if passwords match

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword !== e.target.value) {
      setPasswordMatched(false);
    } else {
      setPasswordMatched(true);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setPasswordMatched(false);
    } else {
      setPasswordMatched(true);
    }
  };

  return (
    <div className="personal-details-container">
      <h1>Personal Details</h1>
      <form className="registration-form">
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
              required
              value={
                field.name === "password"
                  ? password
                  : field.name === "confirm-password"
                  ? confirmPassword
                  : ""
              }
              onChange={
                field.name === "password"
                  ? handlePasswordChange
                  : field.name === "confirm-password"
                  ? handleConfirmPasswordChange
                  : null
              }
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

        {/* The Next button now triggers onNext without form submission */}
        <Button
          name="Next"
          type="button"
          iconLibrary="gr"
          iconName="GrFormNextLink"
          onClick={onNext} // Call onNext when the button is clicked
        />
      </form>
    </div>
  );
};

export default PersonalDetails;
