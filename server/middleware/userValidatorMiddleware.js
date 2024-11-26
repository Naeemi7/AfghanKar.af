import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { logBuddy } from "../utils/logUtils.js";

/**
 * Handler for validating users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const userValidatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  // If there are validation errors
  if (!errors.isEmpty()) {
    const formattedErrors = formatValidationErrors(errors.array(), req);

    // Log the errors after formatting
    logBuddy("Validation Errors: ", { errors: formattedErrors });

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: formattedErrors });
  }

  next();
};

/**
 * Format validation errors for better readability and structure
 * @param {*} errors
 * @param {*} req
 * @returns Formatted error objects
 */
const formatValidationErrors = (errors, req) => {
  return errors.map((error) => {
    const fieldValue = req.body[error.path];
    const customMsg = getCustomMessage(error, fieldValue);

    return {
      type: error.type || "field",
      value: fieldValue || "",
      msg: customMsg,
      path: error.path,
      location: error.location || "body",
      code: getCodeForError(error.path, req.body.role),
    };
  });
};

/**
 * Get custom error message based on validation error and field value
 * @param {*} error
 * @param {*} fieldValue
 * @returns Custom error message
 */
const getCustomMessage = (error, fieldValue) => {
  let customMsg = error.msg;

  // Customize error messages based on field value
  if (!fieldValue) {
    // Custom message for missing fields
    customMsg = `The ${error.path} is missing.`;
  } else if (customMsg.toLowerCase() === "invalid value") {
    customMsg = `The ${error.path} has an invalid value.`;
  }

  // Handle full name specific error
  if (error.path === "fullName") {
    // If the full name error is related to missing first and last name
    if (error.msg === "Full name must contain both first and last names.") {
      customMsg = "The full name must contain both first and last names.";
    } else if (!fieldValue) {
      customMsg = "Full name is missing."; // Customize for missing full name
    }
  }

  return customMsg;
};

/**
 * Get the error code from the field name and role, with a fallback
 * @param {*} field
 * @param {*} role
 * @returns Error code for the given field and role
 */
const getCodeForError = (field, role) => {
  if (!role || !errorCodes[role]) {
    return "00"; // Default error code
  }
  return errorCodes[role][field] || "00"; // Return error code or default "00"
};

// Error codes for job seekers and recruiters
const errorCodes = {
  jobSeeker: {
    fullName: "01",
    username: "02",
    email: "03",
    password: "04",
    phoneNumber: "05",
    resume: "06",
    skills: "07",
    experience: "08",
    address: "09",
  },
  recruiter: {
    fullName: "10",
    email: "11",
    password: "12",
    phoneNumber: "13",
    position: "14",
    companyName: "15",
    companyType: "16",
    foundedIn: "17",
    website: "18",
    description: "19",
    industryType: "20",
    companyLogo: "21",
    country: "22",
    state: "23",
    city: "24",
    street: "25",
  },
};
