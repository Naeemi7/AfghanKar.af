import { useState } from "react";
import "@styles/layouts/layouts.scss";
import "@styles/components/recruiter-registration.scss";
import RecruiterRegistrationSidebar from "@auth/registration/recruiter/RecruiterRegistrationSidebar";
import MainContent from "@auth/registration/recruiter/MainContent";
import useNavigation from "@hooks/useNavigation";
import ShowToast from "@reusable/ShowToast";
import { post } from "@api/apiService";
import useUserContext from "@hooks/useUserContext";
import { logBuddy, logError, handleError } from "@utils/errorUtils";

export default function RecruiterRegistrationLayout() {
  const [currentStep, setCurrentStep] = useState(1);
  const { goTo } = useNavigation();
  const { setError } = useUserContext();
  const [formData, setFormData] = useState({});

  const handleNext = (newData) => {
    if (Object.values(newData).some((val) => !val)) {
      ShowToast("Please fill all the fields before proceeding.", "error");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      ...newData, // Merge new data into the flat structure
    }));

    if (currentStep < 3) setCurrentStep(currentStep + 1);
    else handleSubmit();
  };

  const handlePrevious = () => {
    if (currentStep === 1) {
      goTo("/registration");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    console.log("Final form data beofore submission:", formData);

    try {
      const response = await post("/recruiter/register", formData, setError);
      logBuddy("Returned form", response);
      ShowToast("Registered successfully!", "success");

      // Redurect to login page after a short delay
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
    // API call for submission
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
