// External packages import
import dotenv from "dotenv";

// Internal imports
import app from "./app.js";
import connectToMongoDB from "./config/db.js";
import userRouters from "./routes/userRoutes.js";

// Define the PORT variable

const PORT = process.env.PORT || 3001;

// Registering routes
app.use("/api/users", userRouters);

// Server is listening the specified port
connectToMongoDB().then(() =>
  app.listen(PORT, () => {
    console.log("Server is listening on port ", PORT);
  })
);
