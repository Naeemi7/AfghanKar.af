const RecruiterRegistrationSidebar = () => {
  return (
    <div className="recruiter-registration-sidebar">
      <div className="sidebar-content">
        <div className="logo">JOBS.AF</div>
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
