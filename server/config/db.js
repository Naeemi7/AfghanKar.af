import mongoose from "mongoose";
import dotenv from "dotenv";
import { logError, logBuddy } from "../utils/logUtils.js";

dotenv.config();

export default async function connectToMongoDB() {
  const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

  if (!DB_USER || !DB_PASS || !DB_HOST || !DB_NAME) {
    logError("Missing necessary environment variables for MongoDB connection");
    return;
  }

  const mongoURI = `mongodb+srv://${DB_USER}:${encodeURIComponent(
    DB_PASS
  )}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

  const options = {
    serverSelectionTimeoutMS: 45000, // Increased timeout to 45 seconds
  };

  try {
    await mongoose.connect(mongoURI, options);
    logBuddy("Database connected! 👍");
  } catch (error) {
    logError("Database connection error:", error.message);
    logError("Stack Trace:", error.stack); // Log the stack trace for more detailed error info
  }
}
