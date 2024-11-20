import { useState } from "react";
import "@styles/layouts/layouts.scss";
import "@styles/components/recruiter-registration.scss";
import RecruiterRegistrationSidebar from "@auth/registration/recruiter/RecruiterRegistrationSidebar";
import MainContent from "@auth/registration/recruiter/MainContent";
import useNavigation from "@hooks/useNavigation";
import ShowToast from "@reusable/ShowToast";

export default function RecruiterRegistrationLayout() {
  const [currentStep, setCurrentStep] = useState(1);
  const { goTo } = useNavigation();

  const [personalData, setPersonalData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [addressData, setAddressData] = useState({});

  const handleNext = (newData) => {
    if (Object.values(newData).some((val) => !val)) {
      ShowToast("Please fill all the fields before proceeding.", "error");
      return;
    }

    if (currentStep === 1) setPersonalData(newData);
    if (currentStep === 2) setCompanyData(newData);
    if (currentStep === 3) setAddressData(newData);

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

  const handleSubmit = () => {
    const fullData = { personalData, companyData, addressData };
    console.log("Final form submission data:", fullData);
    // API call for submission
  };

  return (
    <div className="recruiter-registration-layout">
      <RecruiterRegistrationSidebar currentStep={currentStep} />
      <MainContent
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
        personalData={personalData}
        companyData={companyData}
        addressData={addressData}
      />
    </div>
  );
}
