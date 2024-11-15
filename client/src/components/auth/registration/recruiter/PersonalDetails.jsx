import { useState } from "react";
import PropTypes from "prop-types";
import personalDetails from "@data/registration/recruiter/personalDetails";
import Input from "@reusable/Input";
import Icon from "@reusable/Icon";
import AlertBox from "@reusable/AlertBox";
import Button from "@reusable/Button";
import usePasswordVisibility from "@hooks/usePasswordVisibility";

export default function PersonalDetails({ onNext }) {
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  // Track all form data
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // Track error state
  const [error, setError] = useState("");

  // Check if passwords match
  const passwordsMatch = formData.password === formData.confirmPassword;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (error) setError(""); // Clear error when user starts typing
  };

  // Handle form submission or next step
  const handleNext = () => {
    // Ensure both passwords are filled
    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields.");
      // return;
    }

    // Ensure the passwords match
    if (!passwordsMatch) {
      setError("Passwords do not match.");
      // return;
    }

    // If no errors, proceed to the next step
    onNext();
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
              value={formData[field.name] || ""}
              onChange={handleChange}
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

        {error && <AlertBox message={error} type="error" />}

        <Button
          name="Next"
          type="button"
          iconLibrary="gr"
          iconName="GrFormNextLink"
          onClick={handleNext}
        />
      </form>
    </div>
  );
}

PersonalDetails.propTypes = {
  onNext: PropTypes.func.isRequired,
};
