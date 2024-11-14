import "@styles/layouts/layouts.scss";
import "@styles/components/recruiter-registration.scss";
import RecruiterRegistrationSidebar from "@auth/registration/recruiter/RecruiterRegistrationSidebar";
import RecruiterRegistrationMainContent from "@auth/registration/recruiter/RecruiterRegistrationMainContent";

export default function RecruiterRegistrationLayout() {
  return (
    <div className="recruiter-registration-layout">
      <RecruiterRegistrationSidebar /> {/* Left Sidebar */}
      <RecruiterRegistrationMainContent /> {/* Right Main Content */}
    </div>
  );
}
