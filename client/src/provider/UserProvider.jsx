import { useState } from "react";
import PropTypes from "prop-types";
import UserContext from "@context/UserContext";

export default function UserProvider({ children }) {
  // Retrieve stored user information from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || null;

  const [isLoggedIn, setIsLoggedIn] = useState(!!storedUser);
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(storedUser);
  const [error, setError] = useState("");

  /**
   * Handler function for user login
   * @param {*} data
   */

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
