import express from "express";
import {
  createRecruiter,
  recruiterLogin,
  recruiterLogout,
} from "../controllers/recruiterController.js";
import { validateRecruiterRules } from "../middleware/recruiterValidationRules.js";
import { userValidator } from "../middleware/userValidator.js";

const router = express.Router();

// Unprotected Routes
router.post(
  "/register",
  validateRecruiterRules,
  userValidator,
  createRecruiter
);
router.post("/login", recruiterLogin);
router.get("/logout", recruiterLogout);

export default router;
