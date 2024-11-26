import PropTypes from "prop-types";
import addressDetails from "@data/registration/recruiter/addressDetails";
import Input from "@reusable/Input";
import Select from "@reusable/Select";

import AlertBox from "@reusable/AlertBox";
import Button from "@reusable/Button";
import useUserContext from "@hooks/useUserContext";
import { logBuddy } from "@utils/errorUtils";

export default function AddressDetails({ onNext }) {
  const { error, setError } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Collect address details from the form
    const addressData = {};
    addressDetails().forEach((field) => {
      const { name } = field;
      addressData[name] = formData.get(name) || ""; // Default to empty if field is not filled
    });

    // Validation for required fields
    const isFormValid = addressDetails().every((field) => {
      if (field.required) {
        return addressData[field.name]?.trim();
      }
      return true;
    });

    if (!isFormValid) {
      setError("Please fill out all required fields.");
      return;
    }

    setError("");
    onNext(addressData); // Pass the address data to the parent
    logBuddy("Address Details:", addressData); // Log the data for debugging
  };

  return (
    <div className="address-details-container">
      <h1>Address Details</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
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
                  required={required}
                />
              ) : (
                <Input
                  labelName={labelName}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  required={required}
                />
              )}
            </div>
          );
        })}

        {error && <AlertBox message={error} type="error" />}

        {/* Submit button */}
        <Button name="Register" type="submit" />
      </form>
    </div>
  );
}

AddressDetails.propTypes = {
  onNext: PropTypes.func.isRequired,
};
