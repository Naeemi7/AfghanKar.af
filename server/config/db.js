import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectToMongoDB() {
  const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

  if (!DB_USER || !DB_PASS || !DB_HOST || !DB_NAME) {
    console.error(
      "Missing necessary environment variables for MongoDB connection"
    );
    return;
  }

  const mongoURI = `mongodb+srv://${DB_USER}:${encodeURIComponent(
    DB_PASS
  )}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(mongoURI);
    console.log("Database connected! 👍");
  } catch (error) {
    console.log("Database connection error:", error.message);
  }
}
