import PropTypes from "prop-types";
import addressDetails from "@data/registration/recruiter/addressDetails";
import Input from "@reusable/Input";
import Select from "@reusable/Select";
import AlertBox from "@reusable/AlertBox";
import Button from "@reusable/Button";
import useUserContext from "@hooks/useUserContext";
import useFormValidation from "@hooks/useFormValidation";

export default function AddressDetails({ onNext }) {
  const { error, setError } = useUserContext();

  // Form fields
  const formFields = ["country", "state", "city", "street"];

  // formFileds & setError are passed as props
  const { validateForm } = useFormValidation(formFields, setError);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Collect form data into an object
    const addressData = {
      country: formData.get("country"),
      state: formData.get("state"),
      city: formData.get("city"),
      street: formData.get("street"),
    };

    // Validate required fields
    if (!validateForm(formData)) return;

    // Reset error state
    setError("");

    // Pass collected data to parent (onNext)
    onNext(addressData);
  };

  return (
    <div className="address-details-container">
      <h1>Address Details</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        {addressDetails().map(
          ({ labelName, type, name, options, placeholder, required }) => {
            return (
              <div key={name} className="form-field">
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
          }
        )}

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
