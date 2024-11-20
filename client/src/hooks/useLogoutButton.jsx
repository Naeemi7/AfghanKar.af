import { useRef } from "react";
import ShowToast from "@reusable/ShowToast";
import useUserContext from "@hooks/useUserContext";
import { logError, handleError } from "@utils/errorUtils";
import useNavigation from "@hooks/useNavigation";

export function useLogoutButton() {
  const hasToastShown = useRef(false);
  const { goTo } = useNavigation();
  const { isJobSeekerLoggedIn, userLogoutHandler, setError } = useUserContext();

  const handleLogout = async () => {
    const userType = isJobSeekerLoggedIn ? "jobSeeker" : "recruiter";

    try {
      await userLogoutHandler(userType);

      if (!hasToastShown.current) {
        ShowToast("Logged out successfully", "success");
        hasToastShown.current = true;
      }

      const redirectUrl = isJobSeekerLoggedIn
        ? "/job-seeker-login"
        : "/recruiter-login";

      setTimeout(() => {
        goTo(redirectUrl);
      }, 1500);
    } catch (error) {
      if (!error.handled) {
        error.handled = true;
        logError("Logout failed", error);
        handleError(error, setError);
      }
    }
  };

  return handleLogout;
}
