import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserContext from "@hooks/useUserContext";

export default function RecruiterProtectedRoutes() {
  const { isRecruiterLoggedIn } = useUserContext();
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (!isRecruiterLoggedIn) {
      setRedirect("/recruiter-login");
    }
  }, [isRecruiterLoggedIn]);

  // If redirect is set, perform navigation
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  // Otherwise, render the Outlet for the protected route
  return <Outlet />;
}
