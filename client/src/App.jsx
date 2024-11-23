import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import UserProvider from "@provider/UserProvider";
import setupInterceptors from "@api/axiosIntercepters";
import ProtectedRoute from "@auth/protected-routes/ProtectedRoute";
import NotFoundPage from "@pages/not-found-page/NotFoundPage";
import HomePage from "@pages/home/HomePage";
import JobSeekerLogin from "@auth/login/JobSeekerLogin";
import RecruiterLogin from "@auth/login/RecruiterLogin";
import RegistrationPage from "@pages/registeration-page/RegistrationPage";
import AboutPage from "@pages/about/AboutPage";
import ContactPage from "@pages/contact/ContactPage";
import JobSeekerRegistration from "@auth/registration/job-seeker/JobSeekerRegistration";
import AppLayout from "@layouts/AppLayout";
import JobSeekerLayout from "@layouts/JobSeekerLayout";
import RecruiterLayout from "@layouts/RecruiterLayout";
import RecruiterRegistrationLayout from "@layouts/RecruiterRegistrationLayout";

export default function App() {
  useEffect(() => {
    setupInterceptors();
  }, []);

  return (
    <UserProvider>
      <Routes>
        {/* Routes using App Layout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/job-seeker-login" element={<JobSeekerLogin />} />
          <Route path="/recruiter-login" element={<RecruiterLogin />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Registration Routes */}
          <Route path="/registration" element={<RegistrationPage />} />
          <Route
            path="/job-seeker-registration"
            element={<JobSeekerRegistration />}
          />
        </Route>

        {/* Routes using Recruiter Registration Layout */}
        <Route
          path="/recruiter-registration"
          element={<RecruiterRegistrationLayout />}
        />

        {/* Protected Routes for Job Seeker Dashboard */}
        {/* <Route element={<ProtectedRoute role="jobSeeker" />}> */}
        <Route path="/job-seeker-dashboard/*" element={<JobSeekerLayout />} />
        {/* </Route> */}

        {/* Protected Routes for Recruiter Dashboard */}
        <Route element={<ProtectedRoute role="recruiter" />}>
          <Route path="/recruiter-dashboard/*" element={<RecruiterLayout />} />
        </Route>

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
