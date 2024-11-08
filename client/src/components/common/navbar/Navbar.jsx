import { useState } from "react";
import { useLocation } from "react-router-dom";
import "@styles/components/navbar.scss";
import Profile from "./Profile";
import Logo from "@reusable/Logo";
import Icon from "@reusable/Icon";
import UserInitials from "@reusable/UserInitials";
import useUserContext from "@hooks/useUserContext";
import navItems from "@data/navbar/navItems";
import NavLink from "./NavLink";

const Navbar = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { isJobSeekerLoggedIn, jobSeeker } = useUserContext();
  const location = useLocation();
  const jobSeekerDashboard = location.pathname === "/job-seeker-dashboard";

  return (
    <nav className="navbar-container">
      <div className="navbar-items-container">
        {/* Reusable Logo */}
        <Logo height={8} />

        {/* Navigation Component */}
        <NavLink items={navItems} />

        {/* Hamburger icon for mobile */}
        <div
          className="hamburger-icon"
          onClick={() => setMobileNavOpen((prev) => !prev)}
        >
          <Icon
            library="md"
            name={isMobileNavOpen ? "MdClose" : "MdMenu"}
            size={30}
          />
        </div>

        {/* Conditionally render Profile or User Initial if the user is loggedIn */}
        {isJobSeekerLoggedIn && jobSeekerDashboard ? (
          <UserInitials
            firstname={jobSeeker.firstName}
            lastname={jobSeeker.lastName}
            radius={5}
          />
        ) : (
          <Profile />
        )}
      </div>

      {/* Mobile Navigation Links */}
      {isMobileNavOpen && (
        <div className="mobile-nav">
          <NavLink items={navItems} onClick={() => setMobileNavOpen(false)} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
