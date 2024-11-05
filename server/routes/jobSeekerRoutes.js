import express from "express";
import {
  createJobSeeker,
  jobSeekerLogin,
  jobSeekerLogout,
} from "../controllers/jobSeekerController.js";
import { validateJobSeekerRules } from "../middleware/userValidationRules.js";
import { userValidator } from "../middleware/userValidator.js";

const router = express.Router();

// Unprotected Routes
router.post(
  "/register",
  validateJobSeekerRules,
  userValidator,
  createJobSeeker
);

export default router;
