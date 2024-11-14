import RecruiterRegistrationHeader from "./RecruiterRegistrationHeader";

const RecruiterRegistrationMainContent = () => {
  return (
    <div className="recruiter-registration-main-content">
      {/* Recruiter Registration Header Component */}
      <RecruiterRegistrationHeader />
      <h1>Personal Details</h1>
      <form className="registration-form">
        <div className="form-group">
          <label>First Name*</label>
          <input type="text" placeholder="First Name" />
        </div>
        <div className="form-group">
          <label>Last Name*</label>
          <input type="text" placeholder="Last Name" />
        </div>
        <div className="form-group">
          <label>Email*</label>
          <input type="email" placeholder="e.g. Employer@gmail.com" />
        </div>
        <div className="form-group">
          <label>Position*</label>
          <input type="text" placeholder="e.g. Sales Manager" />
        </div>
        <div className="form-group">
          <label>Mobile*</label>
          <input type="text" placeholder="+93 000000000" />
        </div>
        <div className="form-group">
          <label>Password*</label>
          <input type="password" placeholder="Enter your password" />
        </div>
      </form>
    </div>
  );
};

export default RecruiterRegistrationMainContent;
