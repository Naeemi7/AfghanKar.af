import { body } from "express-validator";
import {
  checkUserExistenceByUsername,
  checkUserExistenceByEmail,
} from "../helpers/userHelper.js";

// Job Seeker Validation Rules
export const validateJobSeekerRules = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Full name must contain only alphabets and spaces.")
    .customSanitizer((value) => capitalizeWords(value)),

  // Validate and normalize email
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .withMessage("Please provide a valid email address.")
    .custom(async (value) => {
      await checkUserExistenceByEmail(value, userType);
    }),

  // Validate password
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a symbol."
    ),

  // Validate username
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers.")
    .isLength({ max: 20 })
    .withMessage("Username can't be longer than 20 characters.")
    .custom(async (value) => {
      await checkUserExistenceByUsername(value, "jobSeeker");
    }),

  // Validate resume URL (optional)
  body("resume").optional().isURL().withMessage("Resume must be a valid URL."),
];
