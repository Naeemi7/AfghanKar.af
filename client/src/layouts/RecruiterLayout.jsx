import { Outlet } from "react-router-dom";
import RecruiterSidebar from "@sidebar/recruiter/RecruiterSidebar";
import Navbar from "@common/navbar/Navbar";
import "@styles/layouts/recruiter-layout.scss";

export default function RecruiterLayout() {
  return (
    <div className="recruiter-layout">
      <Navbar variant="recruiter" />
      <div className="layout-content">
        <RecruiterSidebar />
        <main className="dashboard-content">
          <Outlet /> {/* Routes specific to Recruiter will render here */}
        </main>
      </div>
    </div>
  );
}
