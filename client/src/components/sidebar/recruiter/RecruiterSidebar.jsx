import Sidebar from "@reusable/Sidebar";

export default function RecruiterSidebar() {
  const recruiterLinks = [
    { href: "/recruiter-dashboard/profile", label: "Profile" },
    { href: "/recruiter-dashboard/applicants", label: "Applicants" },
    { href: "/recruiter-dashboard/settings", label: "Settings" },
  ];

  return <Sidebar links={recruiterLinks} />;
}
