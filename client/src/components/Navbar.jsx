import { useLocation } from "react-router-dom";
import "@styles/reusableComponents.scss";
import Greetings from "./Greetings";
import Profile from "./Profile";
import Logo from "./Logo";
import Button from "@reusable/Button";
import Icon from "@reusable/Icon";
import useUserContext from "@hooks/useUserContext";
import useNavigation from "@hooks/useNavigation";

const Navbar = () => {
  const { isLoggedIn } = useUserContext();
  const { goTo } = useNavigation();
  const location = useLocation();

  const isUserDashboard = location.pathname === "/user-dashboard";
  const shouldShowLogo =
    (isLoggedIn && location.pathname === "/home") ||
    (!isLoggedIn && location.pathname === "/");

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
      {shouldShowLogo ? (
        <Logo />
      ) : (
        <Icon
          library="md"
          name="MdOutlineArrowBackIos"
          size={30}
          className="go-back"
          onClick={() => {
            isLoggedIn ? goTo("/home") : goTo("/");
          }}
        />
      )}

      {isLoggedIn ? (
        <>
          <Greetings />
          <Profile />
        </>
      ) : (
        <Button name="Login" width={80} onClick={() => goTo("/user-login")} />
      )}
    </nav>
  );
};

export default Navbar;
