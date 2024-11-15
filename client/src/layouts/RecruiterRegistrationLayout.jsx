import { useState } from "react";
import "@styles/layouts/layouts.scss";
import "@styles/components/recruiter-registration.scss";
import RecruiterRegistrationSidebar from "@auth/registration/recruiter/RecruiterRegistrationSidebar";
import MainContent from "@auth/registration/recruiter/MainContent";

export default function RecruiterRegistrationLayout() {
  const [currentStep, setCurrentStep] = useState(1);

  // Handles moving forward to the next step
  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prevStep) => prevStep + 1);
  };

  // Handles moving backward one step at a time
  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="recruiter-registration-layout">
      <RecruiterRegistrationSidebar currentStep={currentStep} />
      <MainContent
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}
