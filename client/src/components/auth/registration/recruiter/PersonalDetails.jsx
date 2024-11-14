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
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordMatched, setPasswordMatched] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "confirm-password" || name === "password") {
      setPasswordMatched(formData.password === value);
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

        {!passwordMatched && (
          <AlertBox message="Passwords do not match." type="error" />
        )}
        {error && <AlertBox message={error} type="error" />}

        <Button
          name="Next"
          type="button"
          iconLibrary="gr"
          iconName="GrFormNextLink"
          onClick={onNext}
        />
      </form>
    </div>
  );
}

PersonalDetails.propTypes = {
  onNext: PropTypes.func,
};
