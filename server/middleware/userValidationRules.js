import { body } from "express-validator";
import {
  uppercaseFirstLetter,
  checkUserExistenceByEmail,
  checkUserExistenceByUsername,
} from "../helpers/userHelper.js";

// Common validations for both job seekers and recruiters
const commonValidations = (userType) => [
  // Sanitize and validate the first and last name
  body(["firstName", "lastName"])
    .trim()
    .isAlpha("en-GB", { ignore: " " }) // Ignores spaces
    .customSanitizer((value) => uppercaseFirstLetter(value))
    .withMessage("The first name and last name shouldn't contain numbers"),

  // Sanitize and validate the username
  body("username")
    .trim()
    .isAlphanumeric()
    .isLength({ max: 20 })
    .withMessage("Username can't be longer than 20 characters.")
    // Custom validator to check if a username already existed
    .custom(async (value) => {
      await checkUserExistenceByUsername(value, userType);
    }),

  // Sanitize and validate the email
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail() // Normalize email address
    .customSanitizer((value) => value.toLowerCase()) // Convert the email to all lowercase
    // Custom validator to check if an email address already existed
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
  body("resume").optional().isURL().withMessage("Resume must be a valid URL."), // Assuming job seekers can provide a URL to their resume
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
