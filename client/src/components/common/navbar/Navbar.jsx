import { useState } from "react";
import { useLocation } from "react-router-dom";
import "@styles/components/navbar.scss";
import Profile from "./Profile";
import Logo from "@reusable/Logo";
import Icon from "@reusable/Icon";
import navItems from "@data/navbar/navItems";
import NavLink from "./NavLink";

const Navbar = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const home = location.pathname === "/";

  // Filter out the "Home" nav item if we are already on the home page
  const filteredNavItems = home
    ? navItems.filter((item) => item.label !== "Home")
    : navItems;

  return (
    <nav className="navbar-container">
      <div className="navbar-items-container">
        {/* Reusable Logo */}
        <Logo height={8} />

        {/* Navigation Component */}
        <NavLink items={filteredNavItems} />

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

        <Profile />
      </div>

      {/* Mobile Navigation Links */}
      {isMobileNavOpen && (
        <div className="mobile-nav">
          <NavLink
            items={filteredNavItems}
            onClick={() => setMobileNavOpen(false)}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
