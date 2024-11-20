import { useState } from "react";
import PropTypes from "prop-types";
import addressDetails from "@data/registration/recruiter/addressDetails";
import Input from "@reusable/Input";
import Select from "@reusable/Select";
import AlertBox from "@reusable/AlertBox";
import Button from "@reusable/Button";

export default function AddressDetails({ onNext, data }) {
  const [formData, setFormData] = useState(data);
  const [error, setError] = useState(""); // Error state for validation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (error) setError(""); // Clear error on input change
  };

  const handleSubmit = () => {
    // Check for missing required fields
    if (Object.values(formData).some((val) => !val)) {
      setError("Please fill all fields before proceeding.");
      return;
    }
    onNext(formData); // Pass data to parent component for final submission
  };

  return (
    <div className="address-details-container">
      <h1>Address Details</h1>
      <form className="registration-form">
        {addressDetails().map((field, index) => {
          const { labelName, type, name, options, placeholder, required } =
            field;

          return (
            <div key={index} className="form-field">
              {type === "select" ? (
                <Select
                  labelName={labelName}
                  name={name}
                  options={options}
                  placeholder={placeholder}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  required={required}
                />
              ) : (
                <Input
                  labelName={labelName}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  required={required}
                />
              )}
            </div>
          );
        })}

        {error && <AlertBox message={error} type="error" />}

        <Button
          name="Register"
          type="button"
          iconLibrary="gr"
          iconName="GrFormNextLink"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

AddressDetails.propTypes = {
  onNext: PropTypes.func.isRequired,
  data: PropTypes.object, // Initial data passed from parent component
};
