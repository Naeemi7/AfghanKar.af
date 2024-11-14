import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useUserContext from "@hooks/useUserContext";
import ShowToast from "@reusable/ShowToast";

export default function ProtectedRoute({ role }) {
  const { isJobSeekerLoggedIn, isRecruiterLoggedIn } = useUserContext();
  const [redirect, setRedirect] = useState(null);
  const [isToastShown, setIsToastShown] = useState(false); // Track if toast is shown

  useEffect(() => {
    let timeoutId;

    // Based on the role props, check if the user is logged in
    if (role === "jobSeeker" && !isJobSeekerLoggedIn) {
      // Show the toast
      ShowToast("Please log in to access the Job Seeker dashboard.", "error");
      setIsToastShown(true);

      // Set timeout for redirect after showing the toast
      timeoutId = setTimeout(() => {
        setRedirect("/job-seeker-login");
      }, 3000); // Timeout of 3 seconds before redirect
    } else if (role === "recruiter" && !isRecruiterLoggedIn) {
      // Show the toast
      ShowToast("Please log in to access the Recruiter dashboard.", "error");
      setIsToastShown(true);

      // Set timeout for redirect after showing the toast
      timeoutId = setTimeout(() => {
        setRedirect("/recruiter-login");
      }, 3000); // Timeout of 3 seconds before redirect
    }

    // Cleanup timeout on component unmount or when dependencies change
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [role, isJobSeekerLoggedIn, isRecruiterLoggedIn]);

  // If redirect is set, perform navigation (only after timeout)
  if (redirect && isToastShown) {
    return <Navigate to={redirect} />;
  }

  // Otherwise, render the Outlet for the protected route
  return <Outlet />;
}

ProtectedRoute.propTypes = {
  role: PropTypes.string.isRequired,
};
