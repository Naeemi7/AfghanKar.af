import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserContext from "@hooks/useUserContext";

export default function ProtectRoute({ role }) {
  const { isJobSeekerLoggedIn, isRecruiterLoggedIn } = useUserContext();
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    //Based on the role props, check if the user is logged in
    if (role === "jobSeeker" && !isJobSeekerLoggedIn) {
      setRedirect("/job-seeker-login");
    } else if (role === "recruiter" && !isRecruiterLoggedIn) {
      setRedirect("/recruiter-login");
    }
  }, [role, isJobSeekerLoggedIn, isRecruiterLoggedIn]);

  // If redirect is set, perform navigation
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  // Otherwise, render the Outlet for the protect route
  return <Outlet />;
}
