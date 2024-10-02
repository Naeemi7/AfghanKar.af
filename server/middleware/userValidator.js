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
  // Extract the validation error from the request object
  const errors = validationResult(req);

  // If there are errors
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => {
      logBuddy("Validation Error Object: ", error); // Debug log

      return {
        type: "field",
        // Safely check for the field in req.body
        value: req.body[error.path] || "",
        msg: error.msg,
        path: error.path, // Log the correct field that caused the error
        location: error.location || "body",
        code: getCodeForError(error.path),
      };
    });

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: formattedErrors });
  }

  next();
};

// Error codes map
const errorCodes = {
  firstname: "01",
  lastname: "02",
  username: "03",
  email: "04",
  password: "05",
};

// Get error code from field name, with default fallback
const getCodeForError = (field) => {
  const code = errorCodes[field] || "00";
};
