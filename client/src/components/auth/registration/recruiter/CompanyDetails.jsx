import PropTypes from "prop-types";
import companyDetails from "@data/registration/recruiter/companyDetails";
import Input from "@reusable/Input";
import Select from "@reusable/Select";
import Textarea from "@reusable/Textarea";
import AlertBox from "@reusable/AlertBox";
import Button from "@reusable/Button";
import useUserContext from "@hooks/useUserContext";
import { logBuddy } from "@utils/errorUtils";
import { useState } from "react";

export default function CompanyDetails({ onNext }) {
  const { error } = useUserContext();

  // Initialize form state
  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    industryType: "",
    foundedIn: "",
    companyWebsite: "",
    companyDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass the collected data to the parent
    onNext(formData);

    // Log the collected data for debugging
    logBuddy("Company Details: ", formData);
  };

  return (
    <div className="company-details-container">
      <h1>Company Details</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        {companyDetails().map((field, index) => {
          const { labelName, type, name, options, placeholder, required } =
            field;

          return (
            <div key={index} className="form-field">
              {type === "textarea" ? (
                <Textarea
                  labelName={labelName}
                  name={name}
                  value={formData[name] || ""} // Controlled component
                  placeholder={placeholder}
                  required={required}
                  onChange={handleChange}
                />
              ) : type === "select" ? (
                <Select
                  labelName={labelName}
                  name={name}
                  value={formData[name] || ""} // Controlled component
                  options={options}
                  placeholder={placeholder}
                  required={required}
                  onChange={handleChange}
                />
              ) : (
                <Input
                  labelName={labelName}
                  type={type}
                  name={name}
                  value={formData[name] || ""} // Controlled component
                  placeholder={placeholder}
                  required={required}
                  onChange={handleChange}
                />
              )}
            </div>
          );
        })}

        {/* Display any errors using AlertBox */}
        {error && <AlertBox message={error} type="error" />}

        {/* Button to trigger form submission */}
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

CompanyDetails.propTypes = {
  onNext: PropTypes.func.isRequired,
};
