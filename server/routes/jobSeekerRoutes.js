import express from "express";
import {
  createJobSeeker,
  jobSeekerLogin,
  jobSeekerLogout,
} from "../controllers/jobSeekerController.js";
import { validateJobSeekerRules } from "../middleware/jobSeekerValidationRules.js";
import { userValidator } from "../middleware/userValidator.js";

const router = express.Router();

// Unprotected Routes
router.post(
  "/register",
  validateJobSeekerRules,
  userValidator,
  createJobSeeker
);

router.post("/login", jobSeekerLogin);
router.get("/logout", jobSeekerLogout);

export default router;
