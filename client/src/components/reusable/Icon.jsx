import PropTypes from "prop-types";
import * as FaIcons from "react-icons/fa";
import * as FaIcons6 from "react-icons/fa6";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import * as IoIcons5 from "react-icons/io5";
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import * as PiIcons from "react-icons/pi";

const ICON_LIBRARIES = {
  fa: FaIcons,
  fa6: FaIcons6,
  md: MdIcons,
  io: IoIcons,
  io5: IoIcons5,
  bs: BsIcons,
  ri: RiIcons,
  pi: PiIcons,
};

export default function ReusableIcon({
  library = "fa",
  name,
  size = 24,
  className = "",
  onClick,
}) {
  const IconLibrary = ICON_LIBRARIES[library];
  const IconComponent = IconLibrary ? IconLibrary[name] : null;

  if (!IconComponent) {
    console.warn(`Icon ${name} not found in ${library} library.`);
    return null;
  }

  const combinedClassName = `${className} cursor-pointer`.trim();

  return (
    <IconComponent
      size={size}
      className={combinedClassName}
      onClick={onClick}
    />
  );
}

ReusableIcon.propTypes = {
  library: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
