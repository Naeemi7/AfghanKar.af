import { useContext } from "react";
import UserContext from "@context/UserContext";

export default function useUserContext() {
  // Access the UserContext
  const context = useContext(UserContext);

  // Throw an eror if used outside of a UserProvider
  if (!context) {
    throw new Error("UseUserContext must be used within a UserProvider");
  }

  return context;
}
