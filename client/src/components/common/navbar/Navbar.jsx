import { useState } from "react";
import "@styles/reusableComponents.scss";
import Profile from "./Profile";
import Logo from "./Logo";
import Icon from "@reusable/Icon";
import navItems from "@data/navbar/navItems";
import NavLink from "./NavLink";

const Navbar = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className="navbar-container">
      <div className="navbar-items-container">
        {/* Logo Component */}
        <Logo />

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

        {/* Profile component */}
        {isMobileNavOpen && <Profile />}
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
