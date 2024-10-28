import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "@styles/layouts/App.scss";
import UserProvider from "@provider/UserProvider";
import Navbar from "@common/navbar/Navbar";
import Footer from "@common/footer/Footer";
import NotFoundPage from "@pages/not-found-page/NotFoundPage";
import JobSeekerLogin from "@auth/job-seeker-login/JobSeekerLogin";
import RecruiterLogin from "@auth/recruiter-login/RecruiterLogin";
import RegisterationPage from "@pages/registeration-page/RegisterationPage";
import JobSeekerRegistration from "@auth/job-seeker-registeration/JobSeekerRegistration";
import RecruiterRegisteration from "@auth/recruiter-registeration/RecruiterRegisteration";

function App() {
  return (
    <div className="app">
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/job-seeker-login" element={<JobSeekerLogin />} />
          <Route path="/recruiter-login" element={<RecruiterLogin />} />
          <Route path="/user-registeration" element={<RegisterationPage />} />
          <Route
            path="/job-seeker-registration"
            element={<JobSeekerRegistration />}
          />
          <Route
            path="/recruiter-registration"
            element={<RecruiterRegisteration />}
          />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
        <Footer />
        {/* React Hot Toast setup */}
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "#749c75",
                color: "#fffafa",
              },
            },
            error: {
              style: {
                background: "#dd2d4a",
                color: "#fffafa",
              },
            },
          }}
        />
        ;
      </UserProvider>
    </div>
  );
}

export default App;
