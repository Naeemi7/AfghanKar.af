// External packages import
import dotenv from "dotenv";
dotenv.config(); // configuring dotenv to access the .env variables

// Internal imports
import app from "./app.js";
import connectToMongoDB from "./config/db.js";
import jobSeekerRoutes from "./routes/jobSeekerRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import { logBuddy } from "./utils/logUtils.js";

// Define the PORT variable
const PORT = process.env.PORT || 3001;

// Registering routes
app.use("/api/job-seeker", jobSeekerRoutes);
app.use("/api/recruiter", recruiterRoutes);

// Server is listening the specified port
connectToMongoDB().then(() =>
  app.listen(PORT, () => {
    logBuddy("Server is listening on port ", PORT);
  })
);
