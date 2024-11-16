import mongoose from "mongoose";
import dotenv from "dotenv";
import { logError, logBuddy } from "../utils/logUtils.js";

dotenv.config();

// Helper function to check the presence of necessary environment variables
function validateEnvVariables(variables) {
  for (const variable of variables) {
    if (!process.env[variable]) {
      logError(`Missing environment variable: ${variable}`);
      return false;
    }
  }
  return true;
}

export default async function connectToMongoDB() {
  const requiredEnvVariables = ["DB_USER", "DB_PASS", "DB_HOST", "DB_NAME"];

  if (!validateEnvVariables(requiredEnvVariables)) {
    return; // Stop execution if environment variables are missing
  }

  const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

  const mongoURI = `mongodb+srv://${DB_USER}:${encodeURIComponent(
    DB_PASS
  )}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

  const options = {
    serverSelectionTimeoutMS: 45000, // Increased timeout to 45 seconds
    socketTimeoutMS: 45000, // Increased socket timeout to 45 seconds
    family: 4, // Use IPv4, ensuring compatibility across networks
  };

  try {
    await mongoose.connect(mongoURI, options);
    logBuddy("Database connected! 👍");
  } catch (error) {
    logError("Database connection error:", error.message);
    logError("Stack Trace:", error.stack); // Log the stack trace for detailed error info
  }
}
