import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

// Function to determine code based on the field
const getCodeForError = (field) => {
  switch (field) {
    case "firstName":
    case "lastName":
      return "01"; // Code for no number, only string
    case "username":
      return "02"; // Code for username-specific error
    case "email":
      return "03"; // Code for email-specific error
    case "password":
      return "04"; // Code for password-specific error
    default:
      return "00"; // Default code if not matched
  }
};

/**
 * Middleware to validate users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const userValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      type: "field",
      value: req.body[error.param],
      msg: error.msg,
      path: error.param,
      location: "body",
      code: getCodeForError(error.param),
    }));

    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "You need to provide the required information to sign up!",
      errors: formattedErrors,
    });
  }

  next();
};
