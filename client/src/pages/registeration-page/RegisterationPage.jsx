import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@styles/components/registeration-page.scss";
import SelectionCard from "@reusable/SelectionCard";

const RegisterationPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleSelection = (cardType) => {
    setSelectedCard(cardType); // Set the selected card type
  };

  const handleNextJobSeeker = () => {
    navigate("/job-seeker-registration"); // Corrected path
  };

  const handleNextRecruiter = () => {
    navigate("/recruiter-registration"); // Assuming this is the intended route
  };

  return (
    <div className="registeration-page-container">
      <div className="registeration-heading">
        <h2>Choose Your Registration Type</h2>
      </div>

      <div className="registeration-page-wrapper">
        <SelectionCard
          select={selectedCard === "jobSeeker"} // Check if this card is selected
          handleSelection={() => handleSelection("jobSeeker")} // Pass identifier for Job Seeker
          handleNext={handleNextJobSeeker} // Pass specific handler for Job Seeker
          iconLib="fa"
          iconName="FaUserTie"
          heading="Job Seeker"
          content="Looking for a job?"
        />
        <SelectionCard
          select={selectedCard === "recruiter"} // Check if this card is selected
          handleSelection={() => handleSelection("recruiter")} // Pass identifier for Recruiter
          handleNext={handleNextRecruiter} // Pass specific handler for Recruiter
          iconLib="fa"
          iconName="FaUserCheck"
          heading="Recruiter"
          content="Hiring new employee?"
        />
      </div>
    </div>
  );
};

export default RegisterationPage;
