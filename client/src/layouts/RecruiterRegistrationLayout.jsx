import { useState } from "react";
import "@styles/layouts/layouts.scss";
import "@styles/components/recruiter-registration.scss";
import RecruiterRegistrationSidebar from "@auth/registration/recruiter/RecruiterRegistrationSidebar";
import MainContent from "@auth/registration/recruiter/MainContent";
import useNavigation from "@hooks/useNavigation";

export default function RecruiterRegistrationLayout() {
  const [currentStep, setCurrentStep] = useState(1);
  const { goTo } = useNavigation();

  // Handles moving forward to the next step
  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prevStep) => prevStep + 1);
  };

  // Handles moving backward or navigating to home if on the first step
  const handlePrevious = () => {
    if (currentStep === 1) {
      goTo("/registration");
    } else {
      setCurrentStep((prevStep) => prevStep - 1);
    }
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
