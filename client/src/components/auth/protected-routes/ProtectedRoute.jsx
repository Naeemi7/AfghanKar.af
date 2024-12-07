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
  const { isJobSeekerLoggedIn, isRecruiterLoggedIn, loading, setLoading } =
    useUserContext();
  const [redirect, setRedirect] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [previousLoginState, setPreviousLoginState] = useState({
    isJobSeekerLoggedIn,
    isRecruiterLoggedIn,
  });

  useEffect(() => {
    // Wait for the login state to be initialized
    if (
      isJobSeekerLoggedIn !== undefined &&
      isRecruiterLoggedIn !== undefined
    ) {
      // Once state is set, stop loading
      setLoading(false);
    }
  }, [isJobSeekerLoggedIn, isRecruiterLoggedIn, setLoading]);

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

  // Compare the current login state with the previous state to detect logout
  useEffect(() => {
    if (
      isJobSeekerLoggedIn !== previousLoginState.isJobSeekerLoggedIn ||
      isRecruiterLoggedIn !== previousLoginState.isRecruiterLoggedIn
    ) {
      // If login state has changed (i.e., the user logged out), suppress the toast
      if (
        !isJobSeekerLoggedIn &&
        !isRecruiterLoggedIn &&
        previousLoginState.isJobSeekerLoggedIn !== undefined
      ) {
        setToastMessage(null); // Prevent showing the toast message if logged out
      }

      // Update previous login state
      setPreviousLoginState({
        isJobSeekerLoggedIn,
        isRecruiterLoggedIn,
      });
    }
  }, [isJobSeekerLoggedIn, isRecruiterLoggedIn, previousLoginState]);

  useEffect(() => {
    if (toastMessage) {
      ShowToast(toastMessage, "error");
    }
    setToastMessage(null); // Reset toast message after displaying it
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
