import Sidebar from "@reusable/Sidebar";
import recruiterSidebarData from "@data/sidebar/recruiterSidebarData";
import profileImage from "@images/navbar/profile.png";
import useUserContext from "@hooks/useUserContext";

export default function RecruiterSidebar() {
  const { recruiter } = useUserContext();

  if (!recruiter) {
    return (
      <Sidebar
        links={recruiterSidebarData}
        avatarImage={profileImage}
        avatarHeading="Loading..."
        avatarParagraph="Please wait, loading user data."
      />
    );
  }

  return (
    <Sidebar
      links={recruiterSidebarData}
      avatarImage={profileImage}
      avatarHeading={`${recruiter.firstName} ${recruiter.lastName}`}
      avatarParagraph={recruiter.email}
    />
  );
}
