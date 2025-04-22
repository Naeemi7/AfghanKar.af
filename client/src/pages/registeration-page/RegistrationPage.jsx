import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@styles/pages/pages-style.scss";
import SelectionCard from "@reusable/SelectionCard";

export default function RegistrationPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleSelection = (cardType) => {
    setSelectedCard(cardType);
  };

  const handleNextJobSeeker = () => {
    navigate("/job-seeker-registration");
  };

  const handleNextRecruiter = () => {
    navigate("/recruiter-registration");
  };

  return (
    <div className="registration-page-container">
      <div className="registration-heading">
        <h2>Choose Your Registration Type</h2>
      </div>

      <div className="registration-page-wrapper">
        {/* Reusable SelectionCard Component */}
        <SelectionCard
          select={selectedCard === "jobSeeker"}
          handleSelection={() => handleSelection("jobSeeker")}
          handleNext={handleNextJobSeeker}
          iconLib="fa"
          iconName="FaUserTie"
          heading="Job Seeker"
          content="Looking for a job?"
        />

        {/* Reusable SelectionCard Component */}
        <SelectionCard
          select={selectedCard === "recruiter"}
          handleSelection={() => handleSelection("recruiter")}
          handleNext={handleNextRecruiter}
          iconLib="fa"
          iconName="FaUserCheck"
          heading="Recruiter"
          content="Hiring new employee?"
        />
      </div>
    </div>
  );
}
