import Logo from "@reusable/Logo";

const RecruiterRegistrationSidebar = ({ currentStep }) => {
  const getStepClass = (step) =>
    currentStep === step ? "step active" : "step";

  return (
    <div className="recruiter-registration-sidebar">
      <div className="sidebar-content">
        <div className="logo">
          <Logo height={30} />
        </div>
        <h2>Have your account now</h2>
        <p>Register as an employer</p>
        <div className="stepper">
          <div className={getStepClass(1)}>
            <div className="circle">1</div>
            <span>Personal Details</span>
          </div>
          <div className={getStepClass(2)}>
            <div className="circle">2</div>
            <span>Company Details</span>
          </div>
          <div className={getStepClass(3)}>
            <div className="circle">3</div>
            <span>Address Details</span>
          </div>
          <div className="line-bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterRegistrationSidebar;
