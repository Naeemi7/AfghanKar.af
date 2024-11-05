import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "@styles/layouts/App.scss";
import UserProvider from "@provider/UserProvider";
import Navbar from "@common/navbar/Navbar";
import Footer from "@common/footer/Footer";
import NotFoundPage from "@pages/not-found-page/NotFoundPage";
import JobSeekerLogin from "@auth/job-seeker-login/JobSeekerLogin";
import RecruiterLogin from "@auth/recruiter-login/RecruiterLogin";
import RegistrationPage from "@pages/registeration-page/RegistrationPage";
import HomePage from "@pages/home/HomePage";
import JobSeekerRegistration from "@auth/job-seeker-registration/JobSeekerRegistration";
import RecruiterRegistration from "@auth/recruiter-registration/RecruiterRegisteration";
import JobSeekerDashboard from "@dashboards/JobSeekerDashboard";
import RecruiterDashboard from "@dashboards/RecruiterDashboard";

export default function App() {
  return (
    <div className="app-grid">
      <UserProvider>
        <Navbar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/job-seeker-login" element={<JobSeekerLogin />} />
            <Route path="/recruiter-login" element={<RecruiterLogin />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route
              path="/job-seeker-registration"
              element={<JobSeekerRegistration />}
            />
            <Route
              path="/recruiter-registration"
              element={<RecruiterRegistration />}
            />
            <Route
              path="/job-seeker-dashboard"
              element={<JobSeekerDashboard />}
            />
            <Route
              path="/recruiter-dashboard"
              element={<RecruiterDashboard />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          toastOptions={{
            success: { style: { background: "#749c75", color: "#fffafa" } },
            error: { style: { background: "#dd2d4a", color: "#fffafa" } },
          }}
        />
      </UserProvider>
    </div>
  );
}
