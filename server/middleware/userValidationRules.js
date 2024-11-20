import { body } from "express-validator";
import {
  checkUserExistenceByEmail,
  checkUserExistenceByUsername,
  capitalizeWords,
} from "../helpers/userHelper.js";

// Common validations for both job seekers and recruiters
const commonValidations = (userType) => [
  // Validate and sanitize the full name
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Full name must contain only alphabets and spaces.")
    .customSanitizer((value) => capitalizeWords(value)),

  // Validate username
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers.")
    .isLength({ max: 20 })
    .withMessage("Username can't be longer than 20 characters.")
    .custom(async (value) => {
      await checkUserExistenceByUsername(value, userType);
    }),

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
];

// Job Seeker Validation Rules
export const validateJobSeekerRules = [
  ...commonValidations("jobSeeker"),
  body("resume").optional().isURL().withMessage("Resume must be a valid URL."),
];

// Recruiter Validation Rules
export const validateRecruiterRules = [
  ...commonValidations("recruiter"),
  body("companyDetails.companyName")
    .trim()
    .notEmpty()
    .withMessage("Company name is required."),
  body("companyDetails.companyType")
    .trim()
    .isIn(["Small", "Medium", "Large"])
    .withMessage("Company type must be 'Small', 'Medium', or 'Large'."),
  body("companyDetails.foundedIn")
    .isNumeric()
    .isLength({ min: 4, max: 4 })
    .withMessage("Founded year must be a 4-digit number."),
  body("companyDetails.website")
    .optional()
    .isURL()
    .withMessage("Company website must be a valid URL."),
  body("companyDetails.description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description can't exceed 500 characters."),
  body("addressDetails")
    .optional()
    .isObject()
    .withMessage("Address must be a valid object.")
    .custom((value) => {
      const requiredFields = ["street", "city", "state", "zip"];
      requiredFields.forEach((field) => {
        if (!value[field]) {
          throw new Error(`Address must include ${field}.`);
        }
      });
      return true;
    }),
];
