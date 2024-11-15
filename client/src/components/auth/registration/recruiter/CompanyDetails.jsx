import { useState } from "react";
import PropTypes from "prop-types";
import companyDetails from "@data/registration/recruiter/companyDetails";
import Input from "@reusable/Input";
import Select from "@reusable/Select";
import Textarea from "@reusable/Textarea";
import AlertBox from "@reusable/AlertBox";
import Button from "@reusable/Button";

export default function CompanyDetails({ onNext }) {
  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    industryType: "",
    foundedIn: "",
    companyWebsite: "",
    companyDescription: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (error) setError("");
  };

  const handleNext = () => {
    const requiredFields = ["companyName", "companyType", "industryType"];
    const emptyField = requiredFields.find((field) => !formData[field]);

    if (emptyField) {
      setError(`Please fill in the required field: ${emptyField}`);
      // return;
    }
    onNext();
  };

  return (
    <div className="company-details-container">
      <h1>Company Details</h1>
      <form className="registration-form">
        {companyDetails().map((field, index) => {
          const { labelName, type, name, options, placeholder, required } =
            field;

          return (
            <div key={index} className="form-field">
              {type === "textarea" ? (
                <Textarea
                  labelName={labelName}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  required={required}
                />
              ) : type === "select" ? (
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

CompanyDetails.propTypes = {
  onNext: PropTypes.func.isRequired,
};
