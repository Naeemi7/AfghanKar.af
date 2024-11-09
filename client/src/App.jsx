import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserProvider from "@provider/UserProvider";
import NotFoundPage from "@pages/not-found-page/NotFoundPage";
import HomePage from "@pages/home/HomePage";
import JobSeekerLogin from "@auth/login/JobSeekerLogin";
import RecruiterLogin from "@auth/login/RecruiterLogin";
import JobSeekerLogout from "@auth/logout/JobSeekerLogout";
import RecruiterLogout from "@auth/logout/RecruiterLogout";
import RegistrationPage from "@pages/registeration-page/RegistrationPage";
import JobSeekerRegistration from "@auth/registration/JobSeekerRegistration";
import RecruiterRegistration from "@auth/registration/RecruiterRegisteration";
import AppLayout from "@layouts/AppLayout";
import JobSeekerLayout from "@layouts/JobSeekerLayout";
import RecruiterLayout from "@layouts/RecruiterLayout";

export default function App() {
  return (
    <UserProvider>
      <Routes>
        {/* Routes using App Layout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/job-seeker-login" element={<JobSeekerLogin />} />
          <Route path="/recruiter-login" element={<RecruiterLogin />} />
          <Route path="/job-seeker-logout" element={<JobSeekerLogout />} />
          <Route path="recruiter-logout" element={<RecruiterLogout />} />

          {/* Registration Routes */}
          <Route path="/registration" element={<RegistrationPage />} />
          <Route
            path="/job-seeker-registration"
            element={<JobSeekerRegistration />}
          />
          <Route
            path="/recruiter-registration"
            element={<RecruiterRegistration />}
          />
        </Route>

        {/* Job Seeker Dashboard Layout */}
        <Route path="/job-seeker-dashboard/*" element={<JobSeekerLayout />} />

        {/* Recruiter Dashboard Layout */}
        <Route path="/recruiter-dashboard/*" element={<RecruiterLayout />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster
        toastOptions={{
          success: { style: { background: "#749c75", color: "#fffafa" } },
          error: { style: { background: "#dd2d4a", color: "#fffafa" } },
        }}
      />
    </UserProvider>
  );
}
