import { useState } from "react";
import PropTypes from "prop-types";
import companyDetails from "@data/registration/recruiter/companyDetails";
import Input from "@reusable/Input";
import Select from "@reusable/Select"; // Assuming you have a reusable Select component
import Textarea from "@reusable/Textarea"; // Assuming you have a reusable Textarea component
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
  };

  return (
    <div className="company-details-container">
      <h1>Company Details</h1>
      <form className="registration-form">
        {companyDetails().map((field, index) => {
          const { labelName, type, name, options, placeholder, required } =
            field;

          return (
            <div key={index}>
              {type === "text" || type === "date" ? (
                <Input
                  labelName={labelName}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  required={required}
                  value={formData[name] || ""}
                  onChange={handleChange}
                />
              ) : type === "select" ? (
                <Select
                  labelName={labelName}
                  name={name}
                  options={options}
                  placeholder={placeholder}
                  value={formData[name] || ""}
                  onChange={handleChange}
                />
              ) : type === "textarea" ? (
                <Textarea
                  labelName={labelName}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name] || ""}
                  onChange={handleChange}
                />
              ) : null}
            </div>
          );
        })}

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

CompanyDetails.propTypes = {
  onNext: PropTypes.func,
};
