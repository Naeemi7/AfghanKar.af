import { StatusCodes } from "http-status-codes";
import { verifyJwt } from "../helpers/jwt.js";
import { logError } from "../utils/logUtils.js";

/**
 * The  middleware to authenticate users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.userToken;

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No security token" });
  }

  try {
    const isValid = await verifyJwt(token);

    if (isValid) {
      // If the token is valid, proceed to the next middleware or route
      next();
    } else {
      // If there is an invalid token, return an unauthorized response
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid security token" });
    }
  } catch (error) {
    // Handle errors during token verification
    logError("Error verifying token:", error);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Security token issue" });
  }
};
