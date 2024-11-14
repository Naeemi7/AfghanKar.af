import Logo from "@reusable/Logo";

const RecruiterRegistrationSidebar = () => {
  return (
    <div className="recruiter-registration-sidebar">
      <div className="logo">
        <Logo height={30} />
      </div>
      <div className="sidebar-content">
        <h2>Have your account now</h2>
        <p>Register as an employer</p>
        <div className="stepper">
          <div className="step active">
            <div className="circle">1</div>
            <span>Personal Details</span>
          </div>
          <div className="step">
            <div className="circle">2</div>
            <span>Company Details</span>
          </div>
          <div className="step">
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
