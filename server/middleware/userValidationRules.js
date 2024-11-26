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
  body("resume").optional().isURL().withMessage("Resume must be a valid URL."),
];

// Recruiter Validation Rules
export const validateRecruiterRules = [
  ...commonValidations("recruiter"),

  // Company details validations
  body("companyDetails.name")
    .trim()
    .notEmpty()
    .withMessage("Company name is required."),

  body("companyDetails.type")
    .trim()
    .isIn([
      "Private",
      "Public",
      "Non-Profit",
      "Government",
      "Cooperative",
      "Startup",
      "Multinational",
      "Other",
    ])
    .withMessage(
      "Company type must be one of the following: 'Private', 'Public', 'Non-Profit', 'Government', 'Cooperative', 'Startup', 'Multinational', 'Other'."
    ),

  body("companyDetails.foundedIn")
    .isISO8601()
    .toDate()
    .withMessage("Founded date must be a valid date.")
    .custom((value) => {
      const year = value.getFullYear();
      if (year < 1800 || year > new Date().getFullYear()) {
        throw new Error(
          "Founded year must be between 1800 and the current year."
        );
      }
      return true;
    }),

  body("companyDetails.website")
    .optional()
    .isURL()
    .withMessage("Company website must be a valid URL."),

  body("companyDetails.description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description can't exceed 500 characters."),

  body("companyDetails.industryType")
    .trim()
    .isIn([
      "IT",
      "Finance",
      "Healthcare",
      "Education",
      "Retail",
      "Manufacturing",
      "Construction",
      "Real Estate",
      "Agriculture",
      "Hospitality",
      "Telecommunication",
      "Other",
    ])
    .withMessage("Industry type must be one of the predefined categories."),

  body("companyDetails.logo")
    .optional()
    .isURL()
    .withMessage("Company logo must be a valid URL."),

  // Address details validations
  body("address.country").trim().notEmpty().withMessage("Country is required."),

  body("address.state").trim().notEmpty().withMessage("State is required."),

  body("address.city").trim().notEmpty().withMessage("City is required."),

  body("address.street").trim().notEmpty().withMessage("Street is required."),
];
