import PropTypes from "prop-types";
import Header from "./Header";
import PersonalDetails from "./PersonalDetails";
import CompanyDetails from "./CompanyDetails";
import AddressDetails from "./AddressDetails";

export default function MainContent({ currentStep, onNext }) {
  return (
    <div className="recruiter-registration-main-content">
      {/* Recruiter Registration Header Component */}
      <Header />

      {/* {currentStep === 1 ? (
        <PersonalDetails onNext={onNext} />
      ) : (
        <CompanyDetails />
      )} */}

      {currentStep === 1 && <PersonalDetails onNext={onNext} />}
      {currentStep === 2 && <CompanyDetails onNext={onNext} />}
      {currentStep === 3 && <AddressDetails onNext={onNext} />}
    </div>
  );
}

MainContent.propTypes = {
  currentStep: PropTypes.number,
  onNext: PropTypes.func,
};
