import Sidebar from "@reusable/Sidebar";
import jobSeekerSidebarData from "@data/sidebar/jobSeekerSidebarData";
import profileImage from "@images/navbar/profile.png";
import useUserContext from "@hooks/useUserContext";

export default function JobSeekerSidebar() {
  const { jobSeeker } = useUserContext();

  // Fallback data in case jobSeeker is not available
  if (!jobSeeker) {
    return (
      <Sidebar
        links={jobSeekerSidebarData}
        avatarImage={profileImage}
        avatarHeading="Loading..."
        avatarParagraph="Please wait, loading user data."
      />
    );
  }

  return (
    <Sidebar
      links={jobSeekerSidebarData}
      avatarImage={profileImage}
      avatarHeading={jobSeeker.fullName}
      avatarParagraph={jobSeeker.email}
    />
  );
}
