import PropTypes from "prop-types";
import Header from "./Header";
import PersonalDetails from "./PersonalDetails";
import CompanyDetails from "./CompanyDetails";

export default function MainContent({ currentStep, onNext }) {
  return (
    <div className="recruiter-registration-main-content">
      {/* Recruiter Registration Header Component */}
      <Header />

      {currentStep === 1 ? (
        <PersonalDetails onNext={onNext} />
      ) : (
        <CompanyDetails />
      )}
    </div>
  );
}

MainContent.propTypes = {
  currentStep: PropTypes.number,
  onNext: PropTypes.func,
};
