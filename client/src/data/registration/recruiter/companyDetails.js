import formFields from "./formField";

const companyDetails = () => [
  formFields.textField(
    "Company Name",
    "companyName",
    "Enter your company name"
  ),
  formFields.selectField(
    "Company Type",
    "companyType",
    ["Private", "Public", "Non-Profit", "Government", "Other"],
    "Select company type"
  ),
  formFields.selectField(
    "Industry Type",
    "industryType",
    [
      "IT",
      "Finance",
      "Healthcare",
      "Education",
      "Retail",
      "Manufacturing",
      "Other",
    ],
    "Select industry type"
  ),
  formFields.dateField("Founded In", "foundedIn", "Select founding date"),
  formFields.textField(
    "Company Website",
    "companyWebsite",
    "Enter company website"
  ),
  formFields.textareaField(
    "Company Description",
    "companyDescription",
    "Describe your company"
  ),
];

export default companyDetails;
