import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Initializing the cors options
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["HEAD", "GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

export default app;
