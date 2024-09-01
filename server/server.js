// External packages import
import dotenv from "dotenv";
dotenv.config(); // configuring dotenv to access the .env variables

// Internal imports
import app from "./app.js";
import connectToMongoDB from "./config/db.js";
import userRouters from "./routes/userRoutes.js";
import { logBuddy } from "./utils/errorUtils.js";

// Define the PORT variable

const PORT = process.env.PORT || 3001;

// Registering routes
app.use("/api/users", userRouters);

// Server is listening the specified port
connectToMongoDB().then(() =>
  app.listen(PORT, () => {
    logBuddy("Server is listening on port ", PORT);
  })
);
