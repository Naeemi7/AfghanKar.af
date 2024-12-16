import PropTypes from "prop-types";
import companyDetails from "@data/registration/recruiter/companyDetails";
import Input from "@reusable/Input";
import Select from "@reusable/Select";
import Textarea from "@reusable/Textarea";
import AlertBox from "@reusable/AlertBox";
import Button from "@reusable/Button";
import useUserContext from "@hooks/useUserContext";
import useFormValidation from "@hooks/useFormValidation";

export default function CompanyDetails({ onNext }) {
  const { error, setError } = useUserContext();

  // Form fields
  const formFields = [
    "companyName",
    "companyType",
    "industryType",
    "foundedIn",
    "website",
    "description",
  ];

  // formFileds & setError are passed as props
  const { validateForm } = useFormValidation(formFields, setError);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const companyData = {
      companyName: formData.get("companyName"),
      companyType: formData.get("companyType"),
      industryType: formData.get("industryType"),
      foundedIn: formData.get("foundedIn"),
      website: formData.get("website"),
      description: formData.get("description"),
    };

    // Validate required fields
    if (!validateForm(formData)) return;

    // Reset error state
    setError("");

    // Pass collected data to parent
    onNext(companyData);
  };

  return (
    <div className="company-details-container">
      <h1>Company Details</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        {companyDetails().map(
          ({ labelName, type, name, options, placeholder, required }) => {
            return (
              <div key={name} className="form-field">
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
          }
        )}

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
