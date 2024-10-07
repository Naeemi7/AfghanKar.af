import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "@styles/reusableComponents.scss";
import Profile from "./Profile";
import Logo from "./Logo";
import Icon from "@reusable/Icon";
import useUserContext from "@hooks/useUserContext";
import useNavigation from "@hooks/useNavigation";
import navItems from "@data/navbar/navItems";

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
      <div className="navbar-items-container">
        <Logo />

        {/* Navigation links */}
        <div className="nav-links">
          {navItems.map((item, index) => (
            <Link to={item.path} className="nav-item" key={index}>
              <Icon
                library={item.icon.library}
                name={item.icon.name}
                size={item.icon.size}
                className="nav-icon"
              />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Hamburger icon for mobile */}
        <div className="hamburger-icon" onClick={toggleMobileNav}>
          {isMobileNavOpen ? (
            <Icon library="md" name="MdClose" size={30} /> // Close icon
          ) : (
            <Icon library="md" name="MdMenu" size={30} /> // Hamburger icon
          )}
        </div>

        {/* Profile component */}
        <Profile />
      </div>

      {/* Mobile Navigation Links */}
      {isMobileNavOpen && (
        <div className="mobile-nav">
          {navItems.map((item, index) => (
            <a
              href={item.path}
              className="nav-item"
              key={index}
              onClick={toggleMobileNav}
            >
              <Icon
                library={item.icon.library}
                name={item.icon.name}
                size={item.icon.size}
              />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
