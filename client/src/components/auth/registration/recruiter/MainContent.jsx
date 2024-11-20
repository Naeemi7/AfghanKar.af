import PropTypes from "prop-types";
import Header from "./Header";
import PersonalDetails from "./PersonalDetails";
import CompanyDetails from "./CompanyDetails";
import AddressDetails from "./AddressDetails";

export default function MainContent({
  currentStep,
  onNext,
  onPrevious,
  personalData,
  companyData,
  addressData,
}) {
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetails onNext={onNext} data={personalData} />;
      case 2:
        return (
          <CompanyDetails
            onNext={onNext}
            onPrevious={onPrevious}
            data={companyData}
          />
        );
      case 3:
        return (
          <AddressDetails
            onNext={onNext}
            onPrevious={onPrevious}
            data={addressData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="recruiter-registration-main-content">
      <Header onPrevious={onPrevious} />
      {renderStep()}
    </div>
  );
}

MainContent.propTypes = {
  currentStep: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  personalData: PropTypes.object.isRequired,
  companyData: PropTypes.object.isRequired,
  addressData: PropTypes.object.isRequired,
};
