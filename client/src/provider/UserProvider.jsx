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

    if (storedJobSeeker) {
      setJobSeeker(JSON.parse(storedJobSeeker));
      setIsJobSeekerLoggedIn(true);
    }

    if (storedRecruiter) {
      setRecruiter(JSON.parse(storedRecruiter));
      setIsRecruiterLoggedIn(true);
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
   * Function to login Recruiters
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
      logBuddy(response.user);

      if (userType === "jobSeeker") {
        setJobSeeker(response.user);
        setIsJobSeekerLoggedIn(true);
        localStorage.setItem("jobSeeker", JSON.stringify(response.user));
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

  const logoutJobSeeker = () => {
    setJobSeeker(null);
    setIsJobSeekerLoggedIn(false);
    localStorage.removeItem("jobSeeker");
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
