import { useState, useEffect, useRef } from "react";
import Icon from "@reusable/Icon";
import dropdownData from "@data/dropdownData";
import DropdownItems from "./DropdownItems";

export default function Profile() {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);
  let timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setShowDropdown(true), 100); // Add slight delay
  };

  const handleMouseLeave = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setShowDropdown(false), 100); // Add slight delay
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
        <Icon
          library="pi"
          name="PiUserCircleGearFill"
          size={10}
          className="profile-icon"
        />
        <span>Login</span>
      </div>
      {showDropdown && (
        <div
          className={`profile-dropdown ${showDropdown ? "open" : ""}`}
          role="menu"
        >
          <ul>
            {dropdownData.map((item) => (
              <DropdownItems item={item} key={item.to} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
