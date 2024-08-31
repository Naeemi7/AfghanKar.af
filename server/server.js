// External packages import
import dotenv from "dotenv";
dotenv.config(); // Configuring dotenv to access the .env variables

// Internal imports
import app from "./app.js";
import connectToMongoDB from "./config/db.js";

// Define the PORT variable

const PORT = process.env.PORT || 3001;

// Server is listening the specified port
connectToMongoDB().then(() =>
  app.listen(PORT, () => {
    console.log("Server is listening on port ", PORT);
  })
);
