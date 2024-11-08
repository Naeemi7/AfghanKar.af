import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserContext from "@hooks/useUserContext";

export default function JobSeekerProtectedRoutes() {
  const { isJobSeekerLoggedIn } = useUserContext();
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (!isJobSeekerLoggedIn) {
      setRedirect("/job-seeker-login");
    }
  }, [isJobSeekerLoggedIn]);

  // If redirect is set, perform navigation
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  // Otherwise, render the Outlet for the protected route
  return <Outlet />;
}
