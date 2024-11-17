import PropTypes from "prop-types";
import Logo from "@reusable/Logo";

export default function RecruiterRegistrationSidebar({ currentStep }) {
  const getStepClass = (step) => (currentStep >= step ? "step active" : "step");

  const headerData = [
    {
      id: 1,
      spanContent: "Personal Details",
    },
    {
      id: 2,
      spanContent: "Company Details",
    },
    {
      id: 3,
      spanContent: "Address Details",
    },
  ];

  return (
    <div className="recruiter-registration-sidebar">
      <div className="sidebar-content">
        <div className="logo">
          {/* Reusable Logo component */}
          <Logo height={30} />
        </div>
        <h2>Create Your Recruiter Account</h2>
        <p>Complete the steps to start hiring top talent.</p>
        <div className="stepper">
          {headerData.map((item) => (
            <div className={getStepClass(item.id)} key={item.id}>
              <div className="circle">{item.id}</div>
              <span>{item.spanContent}</span>
            </div>
          ))}

          <div className="line-bottom"></div>
        </div>
      </div>
    </div>
  );
}

RecruiterRegistrationSidebar.propTypes = {
  currentStep: PropTypes.number,
};
