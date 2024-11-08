import Sidebar from "@reusable/Sidebar";
import recruiterSidebarData from "@data/sidebar/recruiterSidebarData";
import profileImage from "@images/navbar/profile.png";

export default function RecruiterSidebar() {
  return (
    <Sidebar
      links={recruiterSidebarData}
      avatarImage={profileImage}
      avatarHeading="Sumaya Naeemi"
      avatarParagraph="sumayanaeemi001@gmail.com"
    />
  );
}
