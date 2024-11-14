import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserContext from "@context/UserContext";
import { post, get } from "@api/apiService";
import { logBuddy, logError } from "@utils/errorUtils";

export default function UserProvider({ children }) {
  // Separate states for job seeker and recruiter
  const [jobSeeker, setJobSeeker] = useState(null);
  const [recruiter, setRecruiter] = useState(null);
  const [isJobSeekerLoggedIn, setIsJobSeekerLoggedIn] = useState(false);
  const [isRecruiterLoggedIn, setIsRecruiterLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // Load users from localStorage on mount
  useEffect(() => {
    const storedJobSeeker = localStorage.getItem("jobSeeker");
    const storedRecruiter = localStorage.getItem("recruiter");

    // Parse and validate storedJobSeeker JSON
    if (storedJobSeeker) {
      try {
        setJobSeeker(JSON.parse(storedJobSeeker));
        setIsJobSeekerLoggedIn(true);
      } catch (e) {
        console.error("Error parsing jobSeeker JSON:", e);
        // Clear invalid data
        localStorage.removeItem("jobSeeker");
      }
    }

    // Parse and validate storedRecruiter JSON
    if (storedRecruiter) {
      try {
        setRecruiter(JSON.parse(storedRecruiter));
        setIsRecruiterLoggedIn(true);
      } catch (e) {
        console.error("Error parsing recruiter JSON:", e);
        // Clear invalid data
        localStorage.removeItem("recruiter");
      }
    }
  }, []);

  /**
   * Login function for job seekers
   * @param {*} data
   * @returns
   */
  const loginJobSeeker = async (data) => {
    return login("/job-seeker/login", data, "jobSeeker");
  };

  /**
   * Login function for recruiters
   * @param {*} data
   * @returns
   */
  const loginRecruiter = async (data) => {
    return login("/users/login-recruiter", data, "recruiter");
  };

  /**
   * Generic login function
   * @param {*} url
   * @param {*} data
   * @param {*} userType
   */
  const login = async (url, data, userType) => {
    try {
      const response = await post(url, data, setError);

      // For job seeker, set user data and store it in localStorage
      if (userType === "jobSeeker") {
        setJobSeeker(response.jobSeeker);
        setIsJobSeekerLoggedIn(true);
        logBuddy("Provider: ", response.jobSeeker);
        localStorage.setItem("jobSeeker", JSON.stringify(response.jobSeeker));
      } else if (userType === "recruiter") {
        setRecruiter(response.user);
        setIsRecruiterLoggedIn(true);
        localStorage.setItem("recruiter", JSON.stringify(response.user));
      }
    } catch (error) {
      logError("Login Error", error);
      setError(
        error.response?.data.error ||
          error.message ||
          "An error occurred during login"
      );
      throw error;
    }
  };

  /**
   * Logout function for both user types
   * @param {*} userType
   */
  const userLogoutHandler = async (userType) => {
    try {
      const logoutUrl =
        userType === "jobSeeker"
          ? "/job-seeker/logout"
          : "/users/logout-recruiter";

      await get(logoutUrl);

      if (userType === "jobSeeker") {
        setJobSeeker(null);
        setIsJobSeekerLoggedIn(false);
        localStorage.removeItem("jobSeeker");
      } else if (userType === "recruiter") {
        setRecruiter(null);
        setIsRecruiterLoggedIn(false);
        localStorage.removeItem("recruiter");
      }
    } catch (error) {
      logError("Logout Error", error);
      setError(
        error.response?.data.error ||
          error.message ||
          "An error occurred during logout"
      );
    }
  };

  return (
    <UserContext.Provider
      value={{
        jobSeeker,
        isJobSeekerLoggedIn,
        recruiter,
        isRecruiterLoggedIn,
        error,
        setError,
        loginJobSeeker,
        loginRecruiter,
        userLogoutHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
