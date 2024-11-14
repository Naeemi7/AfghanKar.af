import RecruiterRegistrationHeader from "./RecruiterRegistrationHeader";
import RecruiterRegistrationPersonalDetails from "./RecruiterRegistrationPersonalDetails";

const RecruiterRegistrationMainContent = () => {
  return (
    <div className="recruiter-registration-main-content">
      {/* Recruiter Registration Header Component */}
      <RecruiterRegistrationHeader />

      <RecruiterRegistrationPersonalDetails />
    </div>
  );
};

export default RecruiterRegistrationMainContent;
