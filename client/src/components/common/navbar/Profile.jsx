import { useLocation } from "react-router-dom";
import Icon from "@reusable/Icon";
import dropdownData from "@data/navbar/dropdownData";
import DropdownItems from "./DropdownItems";
import useUserContext from "@hooks/useUserContext";
import UserInitials from "@reusable/UserInitials";
import { useDropdown } from "@hooks/useDropdown";
import jobSeekerAuthDropdownData from "@data/navbar/job-seeker-auth-dropdown";
import recruiterAuthDropdownData from "@data/navbar/recruiter-auth-dropdown";
import dashboardDropdownData from "@data/navbar/dashboard-dropdown-data";

export default function Profile() {
  const location = useLocation();
  const { isJobSeekerLoggedIn, isRecruiterLoggedIn } = useUserContext();
  const jobSeekerDashboard = location.pathname === "/job-seeker-dashboard";
  const recruiterDashboard = location.pathname === "/recruiter-dashboard";

  const {
    showDropdown,
    profileRef,
    handleMouseEnter,
    handleMouseLeave,
    handleKeyDown,
  } = useDropdown();

  const dropdownClassName =
    isJobSeekerLoggedIn || isRecruiterLoggedIn
      ? "user-initial-dropdown"
      : "profile-dropdown";

  // Determine which dropdown data to show based on login status and current page
  let dropdownItems;
  if (jobSeekerDashboard || recruiterDashboard) {
    // Show dashboard data for specific dashboard pages
    dropdownItems = dashboardDropdownData;
  } else if (isJobSeekerLoggedIn) {
    // Show job seeker specific data when logged in
    dropdownItems = jobSeekerAuthDropdownData;
  } else if (isRecruiterLoggedIn) {
    // Show recruiter specific data when logged in
    dropdownItems = recruiterAuthDropdownData;
  } else {
    // Show generic dropdown when not logged in
    dropdownItems = dropdownData;
  }

  return (
    <div
      className="profile-container"
      ref={profileRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      aria-expanded={showDropdown}
    >
      <div className="profile-icon-wrapper">
        {isJobSeekerLoggedIn || isRecruiterLoggedIn ? (
          <UserInitials radius={5} />
        ) : (
          <>
            <Icon
              library="pi"
              name="PiUserCircleGearFill"
              size={22}
              className="profile-icon"
            />
            <span>Login</span>
          </>
        )}
      </div>

      {showDropdown && (
        <div
          className={`${dropdownClassName} ${showDropdown ? "open" : ""}`}
          role="menu"
        >
          <ul>
            {dropdownItems.map((item) => (
              <DropdownItems item={item} key={item.to || item.label} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
