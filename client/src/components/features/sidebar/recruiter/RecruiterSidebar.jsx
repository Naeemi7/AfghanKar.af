import "@styles/components/sidebar.scss";

const RecruiterSidebar = () => {
  return (
    <nav className="recruiter-sidebar">
      <ul>
        <li>
          <a href="/recruiter-dashboard/profile">Profile</a>
        </li>
        <li>
          <a href="/recruiter-dashboard/applicants">Applicants</a>
        </li>
        <li>
          <a href="/recruiter-dashboard/settings">Settings</a>
        </li>
      </ul>
    </nav>
  );
};

export default RecruiterSidebar;
