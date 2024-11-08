import { Outlet } from "react-router-dom";
import "@styles/layouts/layouts.scss";
import JobSeekerSidebar from "@features/sidebar/job-seeker/JobSeekerSidebar";
import Navbar from "@common/navbar/Navbar";

export default function JobSeekerLayout() {
  return (
    <div className="job-seeker-layout">
      {/* Job Seeker Sidebar component */}
      <JobSeekerSidebar />

      <div className="content-container">
        <Navbar variant="job-seeker" />

        {/* Main  Content of the layout*/}
        <main className="layout-content">
          <Outlet /> {/* Routes specific to Job Seeker will render here */}
        </main>
      </div>
    </div>
  );
}
