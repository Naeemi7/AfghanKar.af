import PropTypes from "prop-types";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserContext from "@hooks/useUserContext";
import ShowToast from "@reusable/ShowToast";

/**
 * A generic protected route component that handles redirection based on user role
 * @param {*} param0
 * @returns
 */
export default function ProtectedRoute({ role }) {
  const { isJobSeekerLoggedIn, isRecruiterLoggedIn } = useUserContext();
  const [redirect, setRedirect] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const redirectToLogin = (role) => {
    const route =
      role === "jobSeeker" ? "/job-seeker-login" : "/recruiter-login";
    const message =
      role === "jobSeeker"
        ? "Log in to access the Job Seeker Dashboard"
        : "Log in to access the Recruiter Dashboard";

    setToastMessage(message); // Set toast message
    setRedirect(route); // Set redirection route
  };

  useEffect(() => {
    if (role === "jobSeeker" && !isJobSeekerLoggedIn) {
      redirectToLogin("jobSeeker");
    } else if (role === "recruiter" && !isRecruiterLoggedIn) {
      redirectToLogin("recruiter");
    }
  }, [role, isJobSeekerLoggedIn, isRecruiterLoggedIn]);

  // Show the toast message before redirecting
  useEffect(() => {
    if (toastMessage) {
      ShowToast(toastMessage, "error");
    }
  }, [toastMessage]); // This effect depends on the toastMessage state

  // If redirect is set, perform navigation
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  // Otherwise, render the Outlet for the protected route
  return <Outlet />;
}

ProtectedRoute.propTypes = {
  role: PropTypes.string.isRequired,
};
