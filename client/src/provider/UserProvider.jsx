// UserProvider.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import UserContext from "@context/UserContext";
import { post } from "@api/apiService";
import { logBuddy, logError } from "@utils/errorUtils";

export default function UserProvider({ children }) {
  const storedUser = JSON.parse(localStorage.getItem("user")) || null;
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedUser);
  const [user, setUser] = useState(storedUser);
  const [error, setError] = useState("");

  const loginJobSeeker = async (data) => {
    return login("/users/login", data);
  };

  const loginRecruiter = async (data) => {
    return login("/users/login-recruiter", data);
  };

  const login = async (url, data) => {
    try {
      const response = await post(url, data, setError);
      logBuddy(response.user);
      setUser(response.user);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(response.user));
    } catch (error) {
      setIsLoggedIn(false);
      logError("Login Error", error);
      setError(
        error.response?.data.error ||
          error.message ||
          "An error occurred during login"
      );
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        error,
        setError,
        loginJobSeeker,
        loginRecruiter,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
