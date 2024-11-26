import express from "express";
import {
  createRecruiter,
  recruiterLogin,
  recruiterLogout,
} from "../controllers/recruiterController.js";
import { validateRecruiterRules } from "../middleware/recruiterValidationRules.js";
import { userValidatorMiddleware } from "../middleware/userValidatorMiddleware.js";

const router = express.Router();

// Unprotected Routes
router.post(
  "/register",
  validateRecruiterRules,
  userValidatorMiddleware,
  createRecruiter
);
router.post("/login", recruiterLogin);
router.get("/logout", recruiterLogout);

export default router;
