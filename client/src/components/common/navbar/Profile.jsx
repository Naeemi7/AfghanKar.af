import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Icon from "@reusable/Icon";
import dropdownData from "@data/navbar/dropdownData";
import DropdownItems from "./DropdownItems";
import useUserContext from "@hooks/useUserContext";
import UserInitials from "@reusable/UserInitials";
import jobSeekerAuthDropdownData from "@data/navbar/job-seeker-auth-dropdown";
import dropdownDataDashboard from "@data/navbar/dropdown-data-dashboard";

export default function Profile() {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);
  const timeoutRef = useRef(null); // Use ref for timeout
  const location = useLocation();
  const { isJobSeekerLoggedIn, jobSeeker } = useUserContext();
  const jobSeekerDashboard = location.pathname === "/job-seeker-dashboard";

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowDropdown(true), 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowDropdown(false), 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowDropdown((prev) => !prev);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine the dropdown class based on login status
  const dropdownClassName = isJobSeekerLoggedIn
    ? "user-initial-dropdown"
    : "profile-dropdown"; // Default class

  return (
    <div
      className="profile-container"
      ref={profileRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0} // Make focusable
      role="button"
      aria-haspopup="true"
      aria-expanded={showDropdown}
    >
      <div className="profile-icon-wrapper">
        {isJobSeekerLoggedIn ? (
          <UserInitials
            firstname={jobSeeker.firstName}
            lastname={jobSeeker.lastName}
            radius={5}
          />
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
        {/* Reusable Icon Component */}
      </div>

      {showDropdown && (
        <div
          className={`${dropdownClassName} ${showDropdown ? "open" : ""}`}
          role="menu"
        >
          <ul>
            {(isJobSeekerLoggedIn
              ? jobSeekerAuthDropdownData
              : dropdownData
            ).map((item) => (
              <DropdownItems item={item} key={item.to || item.label} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
