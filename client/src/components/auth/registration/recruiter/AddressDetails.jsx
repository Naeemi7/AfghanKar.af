import { useState } from "react";
import PropTypes from "prop-types";
import addressDetails from "@data/registration/recruiter/addressDetails";
import Input from "@reusable/Input";
import Select from "@reusable/Select";
import AlertBox from "@reusable/AlertBox";
import Button from "@reusable/Button";

export default function AddressDetails({ onNext }) {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    address: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="address-details-container">
      <h1>Address Details</h1>
      <form className="registration-form">
        {addressDetails().map((field, index) => {
          const { labelName, type, name, options, placeholder, required } =
            field;

          // Render Input or Select based on field type
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

        {/* Display error message if any */}
        {error && <AlertBox message={error} type="error" />}

        {/* Submit Button */}
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

AddressDetails.propTypes = {
  onNext: PropTypes.func.isRequired,
};
