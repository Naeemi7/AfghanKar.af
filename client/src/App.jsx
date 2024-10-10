import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "@styles/layouts/App.scss";
import UserProvider from "@provider/UserProvider";
import Navbar from "@common/navbar/Navbar";
import Footer from "@common/footer/Footer";
import NotFoundPage from "@pages/not-found-page/NotFoundPage";
import JobSeekerLogin from "@auth/job-seeker-login/JobSeekerLogin";
import RecruiterLogin from "@auth/recruiter-login/RecruiterLogin";

function App() {
  return (
    <div className="app">
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/job-seeker-login" element={<JobSeekerLogin />} />
          <Route path="/recruiter-login" element={<RecruiterLogin />} />
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
