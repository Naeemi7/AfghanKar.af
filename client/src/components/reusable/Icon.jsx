import PropTypes from "prop-types";
import * as FaIcons from "react-icons/fa";
import * as FaIcons6 from "react-icons/fa6";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import * as IoIcons5 from "react-icons/io5";
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import * as PiIcons from "react-icons/pi";
import * as CiIcons from "react-icons/ci";
import * as GrIcons from "react-icons/gr";
import * as TiIcons from "react-icons/ti";
import * as BiIcons from "react-icons/bi";
import * as Hi2Icons from "react-icons/hi2";

const ICON_LIBRARIES = {
  fa: FaIcons,
  fa6: FaIcons6,
  md: MdIcons,
  io: IoIcons,
  io5: IoIcons5,
  bs: BsIcons,
  ri: RiIcons,
  pi: PiIcons,
  ci: CiIcons,
  gr: GrIcons,
  ti: TiIcons,
  bi: BiIcons,
  hi2: Hi2Icons,
};

export default function Icon({
  library = "fa",
  name,
  size = 24,
  className = "",
  onClick,
}) {
  const IconLibrary = ICON_LIBRARIES[library];
  const IconComponent = IconLibrary ? IconLibrary[name] : null;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in "${library}" library.`);
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

Icon.propTypes = {
  library: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
