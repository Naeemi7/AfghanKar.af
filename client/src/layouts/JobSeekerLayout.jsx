import { Outlet } from "react-router-dom";
import "@styles/layouts/layouts.scss";
import JobSeekerSidebar from "@sidebar/job-seeker/JobSeekerSidebar";
import Navbar from "@common/navbar/Navbar";

export default function JobSeekerLayout() {
  return (
    <div className="job-seeker-layout">
      <Navbar variant="job-seeker" />
      <div className="layout-content">
        <JobSeekerSidebar />
        <main className="dashboard-content">
          <Outlet /> {/* Routes specific to Job Seeker will render here */}
        </main>
      </div>
    </div>
  );
}
