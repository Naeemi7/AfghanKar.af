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
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const companyData = {};
    companyDetails().forEach((field) => {
      const { name } = field;
      companyData[name] = formData.get(name) || ""; // Default empty value if not filled
    });

    if (!companyData.companyName || !companyData.companyType) {
      setFormError("Please fill out all required fields.");
      return;
    }

    setFormError("");
    onNext(companyData); // Pass collected data to parent
    logBuddy("Company Details:", companyData);
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
                  placeholder={placeholder}
                  required={required}
                />
              ) : type === "select" ? (
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

        {formError && <AlertBox message={formError} type="error" />}
        {error && <AlertBox message={error} type="error" />}

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
