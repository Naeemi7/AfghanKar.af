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
  // Loading state to prevent redirecting too early
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for the login state to be initialized
    if (
      isJobSeekerLoggedIn !== undefined &&
      isRecruiterLoggedIn !== undefined
    ) {
      // Once state is set, stop loading
      setLoading(false);
    }
  }, [isJobSeekerLoggedIn, isRecruiterLoggedIn]);

  useEffect(() => {
    if (!loading) {
      if (role === "jobSeeker" && !isJobSeekerLoggedIn) {
        redirectToLogin("jobSeeker");
      } else if (role === "recruiter" && !isRecruiterLoggedIn) {
        redirectToLogin("recruiter");
      }
    }
  }, [loading, role, isJobSeekerLoggedIn, isRecruiterLoggedIn]);

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
    if (toastMessage) {
      ShowToast(toastMessage, "error");
    }
  }, [toastMessage]);

  // If redirect is set, perform navigation
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return <Outlet />;
}

ProtectedRoute.propTypes = {
  role: PropTypes.string.isRequired,
};
