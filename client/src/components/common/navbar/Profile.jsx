import { useState } from "react";
import Icon from "@reusable/Icon";
import dropdownData from "@data/dropdownData";
import DropdownItems from "./DropdownItems";

const Profile = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  return (
    <div
      className="profile-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        <div className="profile-dropdown" role="menu">
          <ul>
            {dropdownData.map((item, index) => (
              <DropdownItems item={item} key={index} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
