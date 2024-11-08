import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserContext from "@context/UserContext";
import { post } from "@api/apiService";
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
        localStorage.removeItem("jobSeeker"); // Clear invalid data
      }
    }

    // Parse and validate storedRecruiter JSON
    if (storedRecruiter) {
      try {
        setRecruiter(JSON.parse(storedRecruiter));
        setIsRecruiterLoggedIn(true);
      } catch (e) {
        console.error("Error parsing recruiter JSON:", e);
        localStorage.removeItem("recruiter"); // Clear invalid data
      }
    }
  }, []);

  /**
   * Function to login job seekers
   * @param {*} data
   * @returns
   */
  const loginJobSeeker = async (data) => {
    return login("/job-seeker/login", data, "jobSeeker");
  };

  /**
   * Function to login recruiters
   * @param {*} data
   * @returns
   */
  const loginRecruiter = async (data) => {
    return login("/users/login-recruiter", data, "recruiter");
  };

  /**
   * Function to login users based on their user type
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

  const logoutJobSeeker = async () => {
    try {
      await post("/job-seeker/logout", null, setError);
      setJobSeeker(null);
      setIsJobSeekerLoggedIn(false);
      localStorage.removeItem("jobSeeker");
    } catch (error) {
      logError("Logout Error", error);
    }
  };

  const logoutRecruiter = () => {
    setRecruiter(null);
    setIsRecruiterLoggedIn(false);
    localStorage.removeItem("recruiter");
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
        logoutJobSeeker,
        logoutRecruiter,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
