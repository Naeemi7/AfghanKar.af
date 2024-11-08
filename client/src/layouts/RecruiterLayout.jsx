import { Outlet } from "react-router-dom";
import "@styles/layouts/layouts.scss";
import RecruiterSidebar from "@features/sidebar/recruiter/RecruiterSidebar";
import Navbar from "@common/navbar/Navbar";

export default function RecruiterLayout() {
  return (
    <div className="recruiter-layout">
      {/* Recruiter Sidebar Component*/}
      <RecruiterSidebar />

      <div className="content-container">
        {/* Navbar Component */}
        <Navbar variant="recruiter" />

        {/* Main Content of the Layout */}
        <main className="layout-content">
          <Outlet /> {/* Routes specific to Recruiter will render here */}
        </main>
      </div>
    </div>
  );
}
