import { useState, useEffect, useCallback } from "react";
import "@styles/layouts/layouts.scss";
import "@styles/components/recruiter-registration.scss";
import RecruiterRegistrationSidebar from "@auth/registration/recruiter/RecruiterRegistrationSidebar";
import MainContent from "@auth/registration/recruiter/MainContent";
import useNavigation from "@hooks/useNavigation";
import ShowToast from "@reusable/ShowToast";
import { post } from "@api/express/apiService";
import useUserContext from "@hooks/useUserContext";
import { logBuddy, logError, handleError } from "@utils/errorUtils";

export default function RecruiterRegistrationLayout() {
  const [currentStep, setCurrentStep] = useState(1);
  const { goTo } = useNavigation();
  const { setError } = useUserContext();
  const [formData, setFormData] = useState({
    personalDetails: {},
    companyDetails: {},
    addressDetails: {},
  });

  // Track when the last step is completed
  const [isFinalStep, setIsFinalStep] = useState(false);

  // Wrap handleSubmit with useCallback to stabilize its reference
  const handleSubmit = useCallback(async () => {
    console.log("Final form data before submission:", formData);

    try {
      const response = await post("/recruiter/register", formData, setError);
      logBuddy("Returned form", response);
      ShowToast("Registered successfully!", "success");

      setTimeout(() => {
        goTo("/recruiter-login");
      }, 1500);
    } catch (err) {
      if (!err.handled) {
        err.handled = true;
        handleError(err, setError);
        logError("Registration error:", err);
      }
    }
  }, [formData, goTo, setError]);

  useEffect(() => {
    // Trigger submission when all steps are complete
    if (isFinalStep) {
      handleSubmit();
    }
  }, [isFinalStep, handleSubmit]); // Add handleSubmit as a dependency

  const handleNext = (newData) => {
    const sectionKey = getSectionKeyForStep(currentStep);

    setFormData((prevData) => ({
      ...prevData,
      [sectionKey]: {
        ...prevData[sectionKey],
        ...newData,
      },
    }));

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mark the final step as completed
      setIsFinalStep(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 1) {
      goTo("/registration");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const getSectionKeyForStep = (step) => {
    switch (step) {
      case 1:
        return "personalDetails";
      case 2:
        return "companyDetails";
      case 3:
        return "addressDetails";
      default:
        return "";
    }
  };

  return (
    <div className="recruiter-registration-layout">
      <RecruiterRegistrationSidebar currentStep={currentStep} />
      <MainContent
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
        formData={formData}
      />
    </div>
  );
}
