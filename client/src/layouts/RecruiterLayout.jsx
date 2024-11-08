import { Outlet } from "react-router-dom";
import "@styles/layouts/layouts.scss";
// import RecruiterSidebar from "@sidebar/recruiter/RecruiterSidebar";
import Navbar from "@common/navbar/Navbar";

export default function RecruiterLayout() {
  return (
    <div className="recruiter-layout">
      <Navbar variant="recruiter" />
      <div className="layout-content">
        {/* <RecruiterSidebar /> */}
        <main className="dashboard-content">
          <Outlet /> {/* Routes specific to Recruiter will render here */}
        </main>
      </div>
    </div>
  );
}
