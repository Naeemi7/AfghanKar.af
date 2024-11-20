import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserContext from "@context/UserContext";
import { post, get } from "@api/apiService";
import { logBuddy, logError } from "@utils/errorUtils";

export default function UserProvider({ children }) {
  const [jobSeeker, setJobSeeker] = useState(null);
  const [recruiter, setRecruiter] = useState(null);
  const [isJobSeekerLoggedIn, setIsJobSeekerLoggedIn] = useState(false);
  const [isRecruiterLoggedIn, setIsRecruiterLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedJobSeeker = localStorage.getItem("jobSeeker");
    const storedRecruiter = localStorage.getItem("recruiter");

    if (storedJobSeeker) {
      try {
        setJobSeeker(JSON.parse(storedJobSeeker));
        setIsJobSeekerLoggedIn(true);
      } catch (e) {
        console.error("Error parsing jobSeeker JSON:", e);
        localStorage.removeItem("jobSeeker");
      }
    }

    if (storedRecruiter) {
      try {
        setRecruiter(JSON.parse(storedRecruiter));
        setIsRecruiterLoggedIn(true);
      } catch (e) {
        console.error("Error parsing recruiter JSON:", e);
        localStorage.removeItem("recruiter");
      }
    }

    // Once the checks are done, set loading to false
    setLoading(false);
  }, []);

  const loginJobSeeker = async (data) => {
    return login("/job-seeker/login", data, "jobSeeker");
  };

  const loginRecruiter = async (data) => {
    return login("/recruiter/login", data, "recruiter");
  };

  const login = async (url, data, userType) => {
    try {
      const response = await post(url, data, setError);

      if (userType === "jobSeeker") {
        setJobSeeker(response.jobSeeker);
        setIsJobSeekerLoggedIn(true);
        logBuddy("Provider: ", response.jobSeeker);
        localStorage.setItem("jobSeeker", JSON.stringify(response.jobSeeker));
      } else if (userType === "recruiter") {
        logBuddy("Provider: ", response.recruiter);
        setRecruiter(response.recruiter);
        setIsRecruiterLoggedIn(true);
        localStorage.setItem("recruiter", JSON.stringify(response.recruiter));
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

  if (loading) {
    return null; // Optionally, return a loading spinner or null until the state is set
  }

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
