import Sidebar from "@reusable/Sidebar";

export default function JobSeekerSidebar() {
  const jobSeekerLinks = [
    { href: "/job-seeker-dashboard/profile", label: "Profile" },
    { href: "/job-seeker-dashboard/jobs", label: "Jobs" },
    { href: "/job-seeker-dashboard/settings", label: "Settings" },
  ];

  return <Sidebar links={jobSeekerLinks} />;
}
