import { Link } from "react-router-dom";
import logo from "@images/navbar/logo3.png";

export default function Logo() {
  return (
    <div className="logo-container">
      <Link to="/home">
        <img src={logo} alt="AfghanKar.af logo" />
      </Link>
    </div>
  );
}
