import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useNavigation from "@hooks/useNavigation";
import { logError, handleError } from "@utils/errorUtils";
import ShowToast from "@reusable/Toast";
import useUserContext from "@hooks/useUserContext";

export default function UserLogout({ userType }) {
  const { goTo } = useNavigation();
  const { logoutJobSeeker, logoutRecruiter, setError } = useUserContext();
  const hasToastShown = useRef(false);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        if (userType === "jobSeeker") {
          // Perform logout operation
          await logoutJobSeeker();

          // Display success toast if not already shown
          if (!hasToastShown.current) {
            ShowToast("Logged out successfully", "success");
            hasToastShown.current = true;
          }
          // Navigate to login page after delay
          setTimeout(() => {
            goTo("/job-seeker-login");
          }, 1500);
        } else if (userType === "recruiter") {
          // Perform logout operation
          await logoutRecruiter();

          // Display success toast if not already shown
          if (!hasToastShown.current) {
            ShowToast("Logged out successfully", "success");
            hasToastShown.current = true;
          }
          // Navigate to login page after delay
          setTimeout(() => {
            goTo("/recruiter-login");
          }, 1500);
        }
      } catch (error) {
        // Handle errors during logout
        if (!error.handled) {
          error.handled = true;
          logError("Logout failed", error);
          handleError(error, setError);
        }
      }
    };

    // Call handleLogout function when component mounts
    handleLogout();
  }, [logoutJobSeeker, logoutRecruiter, goTo, setError, userType]);

  //   usderLogout Component renders null
  return null;
}

UserLogout.propTypes = {
  userType: PropTypes.string.isRequired,
};
