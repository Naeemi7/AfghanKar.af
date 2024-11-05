import "@styles/components/job-seeker-sidebar.scss";

const JobSeekerSidebar = () => {
  return (
    <nav className="job-seeker-sidebar">
      <ul>
        <li>
          <a href="/job-seeker-dashboard/profile">Profile</a>
        </li>
        <li>
          <a href="/job-seeker-dashboard/jobs">Jobs</a>
        </li>
        <li>
          <a href="/job-seeker-dashboard/settings">Settings</a>
        </li>
      </ul>
    </nav>
  );
};

export default JobSeekerSidebar;
