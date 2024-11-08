import Sidebar from "@reusable/Sidebar";
import sidebarData from "@data/sidebar/sidebarData";
import profileImage from "@images/navbar/profile.png";

export default function JobSeekerSidebar() {
  return (
    <Sidebar
      links={sidebarData}
      avatarImage={profileImage}
      avatarHeading="Abdulwase Naeemi"
      avatarParagraph="abdulwasenaeemi7@gmail.com"
    />
  );
}
