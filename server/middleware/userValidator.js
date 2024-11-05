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
export const userValidator = (req, res, next) => {
  // Extract the validation errors from the request object
  const errors = validationResult(req);

  // If there are errors
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => {
      const fieldValue = req.body[error.path];
      let customMsg = error.msg;

      // Check if the value is missing or invalid
      if (!fieldValue) {
        customMsg = `The ${error.path} is missing`; // Customized message for missing fields
      } else if (customMsg.toLowerCase() === "invalid value") {
        customMsg = `The ${error.path} has an invalid value`; // Customized message for invalid values
      }

      logBuddy("Validation Error: ", {
        field: error.path,
        value: fieldValue || "undefined",
        message: customMsg,
      }); // Enhanced logging for each error

      return {
        type: error.type || "field",
        value: fieldValue || "", // Fallback to empty string if value is missing
        msg: customMsg, // Updated message to reflect the missing or invalid field
        path: error.path,
        location: error.location || "body", // Default to "body" if location is not provided
        code: getCodeForError(error.path, req.body.role), // Ensure error code is fetched and included based on user role
      };
    });

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: formattedErrors });
  }

  next();
};

// Error codes map for different fields
const errorCodes = {
  jobSeeker: {
    firstname: "01",
    lastname: "02",
    username: "03",
    email: "04",
    password: "05",
    phoneNumber: "06",
    resume: "07",
    skills: "08",
    experience: "09",
  },
  recruiter: {
    firstname: "10",
    lastname: "11",
    username: "12",
    email: "13",
    password: "14",
    phoneNumber: "15",
    position: "16",
  },
};

// Get the error code from the field name and role, with a default fallback
const getCodeForError = (field, role) => {
  return (errorCodes[role] && errorCodes[role][field]) || "00"; // Return error code or default "00"
};
