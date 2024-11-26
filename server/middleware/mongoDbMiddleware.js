// middleware/duplicateErrorMiddleware.js

import { StatusCodes } from "http-status-codes";

/**
 * Middleware to handle MongoDB duplicate key errors (11000).
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const handleDuplicateKeyError = (err, req, res, next) => {
  if (err.code === 11000) {
    if (err.keyPattern && err.keyPattern.email) {
      return res.status(StatusCodes.CONFLICT).json({
        message:
          "The provided email is already in use. Please use a different email.",
      });
    }
    // Handle other duplicate key errors if necessary (e.g., username, phone number)
    return res.status(StatusCodes.CONFLICT).json({
      message:
        "A conflict occurred with the provided data. Please review and try again.",
    });
  }

  // If error is not a duplicate key error, pass it to the next handler
  next(err);
};
