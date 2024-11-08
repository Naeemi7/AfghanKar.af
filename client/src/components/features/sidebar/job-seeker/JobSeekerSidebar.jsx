import Sidebar from "@reusable/Sidebar";
import jobSeekerSidebarData from "@data/sidebar/jobSeekerSidebarData";
import profileImage from "@images/navbar/profile.png";
import useUserContext from "@hooks/useUserContext";

export default function JobSeekerSidebar() {
  const { jobSeeker } = useUserContext();

  return (
    <Sidebar
      links={jobSeekerSidebarData}
      avatarImage={profileImage}
      avatarHeading={`${jobSeeker.firstName} ${jobSeeker.lastName}`}
      avatarParagraph={jobSeeker.email}
    />
  );
}
