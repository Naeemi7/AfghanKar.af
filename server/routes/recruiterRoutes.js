import express from "express";
import {
  createRecruiter,
  recruiterLogin,
  recruiterLogout,
} from "../controllers/recruiterController.js";
import { validateRecruiterRules } from "../middleware/recruiterValidationRules.js";
import { userValidatorMiddleware } from "../middleware/userValidatorMiddleware.js";
import { handleDuplicateKeyError } from "../middleware/mongoDbMiddleware.js";

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

// Use the duplicate key error handler middleware for all routes
router.use(handleDuplicateKeyError);

export default router;
