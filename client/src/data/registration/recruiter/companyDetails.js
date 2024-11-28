import formFields from "./formField";

const companyDetails = () => [
  formFields.textField(
    "Company Name *",
    "companyName",
    "Enter your company name"
  ),
  formFields.selectField(
    "Company Type *",
    "companyType",
    [
      "Private",
      "Public",
      "Non-Profit",
      "Government",
      "Cooperative",
      "Startup",
      "Multinational",
      "Other",
    ],
    "Select company type"
  ),
  formFields.selectField(
    "Industry Type *",
    "industryType",
    [
      "IT",
      "Finance",
      "Healthcare",
      "Education",
      "Retail",
      "Manufacturing",
      "Construction",
      "Real Estate",
      "Agriculture",
      "Hospitality",
      "Telecommunication",
      "Other",
    ],
    "Select industry type"
  ),
  formFields.dateField("Founded In *", "foundedIn", "Select founding date"),
  formFields.textField("Company Website *", "website", "Enter company website"),
  formFields.textareaField(
    "Company Description *",
    "description",
    "Describe your company"
  ),
];

export default companyDetails;
