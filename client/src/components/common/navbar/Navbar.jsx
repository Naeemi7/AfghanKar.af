import { useState } from "react";
import { useLocation } from "react-router-dom";
import "@styles/reusableComponents.scss";

import Profile from "./Profile";
import Logo from "./Logo";
import Icon from "@reusable/Icon";
import useUserContext from "@hooks/useUserContext";
import useNavigation from "@hooks/useNavigation";

const Navbar = () => {
  const { isLoggedIn } = useUserContext();
  const { goTo } = useNavigation();
  const location = useLocation();

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => setMobileNavOpen(!isMobileNavOpen);

  const isUserDashboard = location.pathname === "/user-dashboard";

  if (isUserDashboard) {
    return (
      <nav className="navbar-container">
        <Icon
          library="md"
          name="MdOutlineArrowBackIos"
          size={30}
          className="go-back"
          onClick={() => {
            isLoggedIn ? goTo("/home") : goTo("/");
          }}
        />
      </nav>
    );
  }

  return (
    <nav className="navbar-container">
      <div className="navbar-items">
        <Logo />
        <div className="nav-links">
          <a href="/jobs" className="nav-item">
            Jobs
          </a>
          <a href="/about" className="nav-item">
            About
          </a>
          <a href="/contact" className="nav-item">
            Contact
          </a>
        </div>

        {/* Hamburger icon for small screens */}
        <div className="hamburger-icon" onClick={toggleMobileNav}>
          {isMobileNavOpen ? (
            <Icon library="md" name="MdClose" size={30} /> // Close icon
          ) : (
            <Icon library="md" name="MdMenu" size={30} /> // Hamburger icon
          )}
        </div>

        {/* Profile on larger screens */}
        <Profile />
      </div>

      {/* Mobile Navigation Links */}
      {isMobileNavOpen && (
        <div className="mobile-nav">
          <a href="/jobs" className="nav-item" onClick={toggleMobileNav}>
            Jobs
          </a>
          <a href="/about" className="nav-item" onClick={toggleMobileNav}>
            About
          </a>
          <a href="/contact" className="nav-item" onClick={toggleMobileNav}>
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
