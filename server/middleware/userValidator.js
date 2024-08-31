import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

/**
 * Handler for validing users
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
    const formattedErrors = errors.array().map((error) => ({
      type: "field",
      value: req.body[error.param],
      msg: error.msg,
      path: error.param,
      location: "body",
      code: getCodeForError(error.param), // function to get code based on field
    }));

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: formattedErrors });
  }

  next();
};

// function to determine code based on field
const getCodeForError = (field) => {
  switch (field) {
    case "firstname":
    case "lastname":
      return "01"; // code for no number only string
    case "username":
      return "02"; // code for username specific error
    case "email":
      return "03"; // code for email specific error
    case "password":
      return "04"; // code for password specific error
    default:
      return "00"; // Default code if not matched
  }
};
