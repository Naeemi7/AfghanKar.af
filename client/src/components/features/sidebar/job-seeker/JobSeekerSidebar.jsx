import Sidebar from "@reusable/Sidebar";
import jobSeekerSidebarData from "@data/sidebar/jobSeekerSidebarData";
import profileImage from "@images/navbar/profile.png";

export default function JobSeekerSidebar() {
  return (
    <Sidebar
      links={jobSeekerSidebarData}
      avatarImage={profileImage}
      avatarHeading="Abdulwase Naeemi"
      avatarParagraph="abdulwasenaeemi7@gmail.com"
    />
  );
}
