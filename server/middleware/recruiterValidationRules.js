import { body } from "express-validator";
import {
  checkUserExistenceByEmail,
  capitalizeWords,
} from "../helpers/userHelper.js";

// Recruiter Validation Rules
export const validateRecruiterRules = [
  body("personalDetails.fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Full name must contain only alphabets and spaces.")
    .customSanitizer((value) => capitalizeWords(value)),

  body("personalDetails.email")
    .trim()
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .withMessage("Please provide a valid email address.")
    .custom(async (value) => {
      const userExists = await checkUserExistenceByEmail(value, "recruiter");
      if (userExists) {
        throw new Error("Email is already in use.");
      }
      return true;
    }),

  body("personalDetails.password")
    .isStrongPassword()
    .withMessage(
      "Password must include at least 8 characters, an uppercase letter, a lowercase letter, a number, and a symbol."
    ),

  body("personalDetails.phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required."),

  body("personalDetails.position")
    .trim()
    .notEmpty()
    .withMessage("Position is required."),

  body("companyDetails.companyName")
    .trim()
    .notEmpty()
    .withMessage("Company name is required."),

  body("companyDetails.companyType")
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
    .withMessage("Company type must be a valid category."),

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
    .notEmpty()
    .withMessage("Industry type is required."),

  body("companyDetails.companyLogo")
    .optional()
    .isURL()
    .withMessage("Company logo must be a valid URL."),

  body("addressDetails.country")
    .trim()
    .notEmpty()
    .withMessage("Country is required."),

  body("addressDetails.state")
    .trim()
    .notEmpty()
    .withMessage("State is required."),

  body("addressDetails.city")
    .trim()
    .notEmpty()
    .withMessage("City is required."),

  body("addressDetails.street")
    .trim()
    .notEmpty()
    .withMessage("Street address is required."),
];
