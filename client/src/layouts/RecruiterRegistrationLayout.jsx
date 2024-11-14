import { useState } from "react";
import "@styles/layouts/layouts.scss";
import "@styles/components/recruiter-registration.scss";
import RecruiterRegistrationSidebar from "@auth/registration/recruiter/RecruiterRegistrationSidebar";
import MainContent from "@auth/registration/recruiter/MainContent";

export default function RecruiterRegistrationLayout() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(2);
  };

  return (
    <div className="recruiter-registration-layout">
      <RecruiterRegistrationSidebar currentStep={currentStep} />
      {/* Left Sidebar */}
      <MainContent currentStep={currentStep} onNext={handleNext} />
    </div>
  );
}
