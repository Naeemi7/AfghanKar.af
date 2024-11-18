import { body } from "express-validator";
import {
  splitAndCapitalizeName,
  checkUserExistenceByEmail,
  checkUserExistenceByUsername,
} from "../helpers/userHelper.js"; // Updated import

// Common validations for both job seekers and recruiters
const commonValidations = (userType) => [
  // Sanitize and validate the first and last name
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isAlpha("en-GB", { ignore: " " }) // Ignores spaces
    .withMessage(
      "The full name must contain only alphabets and a space between first and last name."
    )
    .custom((value) => {
      // Capitalize the full name (first and last name)
      try {
        const { firstName, lastName } = splitAndCapitalizeName(value);
        // Modify the value directly to capitalize the names
        value = `${firstName} ${lastName}`;
      } catch (error) {
        throw new Error(error.message); // Throw error if fullName is invalid
      }
      return value; // Return the modified capitalized name
    }),

  // Sanitize and validate the username
  body("username")
    .trim()
    .isAlphanumeric()
    .isLength({ max: 20 })
    .withMessage("Username can't be longer than 20 characters.")
    .custom(async (value) => {
      await checkUserExistenceByUsername(value, userType);
    }),

  // Sanitize and validate the email
  body("email")
    .trim()
    .isEmail()
    // Ensure dots are not removed, keep Gmail-specific handling if needed
    .normalizeEmail({ all_lowercase: true, gmail_remove_dots: false })
    .customSanitizer((value) => value.toLowerCase()) // Normalize the email to lowercase
    .withMessage("Please provide a valid email address.")
    .custom(async (value) => {
      await checkUserExistenceByEmail(value, userType);
    }),

  // Sanitize and validate the password
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must contain at least 8 characters, at least one lowercase letter, at least one uppercase letter, at least one number, and at least one symbol."
    ),
];

// Job Seeker Validation Rules
export const validateJobSeekerRules = [
  ...commonValidations("jobSeeker"),
  // Specific fields for job seekers
  body("resume").optional().isURL().withMessage("Resume must be a valid URL."),
];

// Recruiter Validation Rules
export const validateRecruiterRules = [
  ...commonValidations("recruiter"),
  // Specific fields for recruiters
  body("companyDetails.companyName")
    .trim()
    .notEmpty()
    .withMessage("Company name is required."),

  body("companyDetails.companyType")
    .trim()
    .isIn(["Small", "Medium", "Large"]) // Assuming these are your enum values
    .withMessage(
      "Company type must be one of the following: Small, Medium, Large."
    ),

  body("companyDetails.foundedIn")
    .isNumeric()
    .withMessage("Founded year must be a number.")
    .isLength({ min: 4, max: 4 })
    .withMessage("Founded year must be a 4-digit number."),

  body("companyDetails.website")
    .optional()
    .isURL()
    .withMessage("Company website must be a valid URL."),

  body("companyDetails.description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Company description can't be longer than 500 characters."),

  // Validate address details
  body("addressDetails")
    .optional()
    .isObject()
    .withMessage("Address details must be an object.")
    .custom((value) => {
      const requiredFields = ["street", "city", "state", "zip"];
      requiredFields.forEach((field) => {
        if (!value[field]) {
          throw new Error(`${field} is required in address details.`);
        }
      });
      return true;
    }),
];
