import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { generateJwt } from "../helpers/jwt.js";

/**
 * Utility function to handle user login (for both recruiters and job seekers).
 * @param {*} userModel
 * @param {*} email
 * @param {*} password
 * @param {*} res
 * @param {*} userType
 * @returns
 */
export const userLogin = async (userModel, email, password, res, userType) => {
  try {
    const lowercaseEmail = email.toLowerCase();

    // Adjust the query for nested fields
    const emailField =
      userType === "recruiter" ? "personalDetails.email" : "email";
    const user = await userModel
      .findOne({ [emailField]: lowercaseEmail })
      .lean();

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found. Please check the email address." });
    }

    // Hash comparison
    const hashedPassword =
      userType === "recruiter" ? user.personalDetails.password : user.password;

    const matchedPassword = await bcrypt.compare(password, hashedPassword);

    if (!matchedPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Incorrect password." });
    }

    // Generate JWT
    const token = generateJwt(user._id);
    res.cookie("userToken", token, { httpOnly: true, secure: false });

    // Exclude password from response
    if (userType === "recruiter") delete user.personalDetails.password;
    else delete user.password;

    // Format response data for recruiter or job seeker
    // Format response data for recruiters or job seekers
    let responseData;
    if (userType === "recruiter") {
      // Flatten nested recruiter details
      responseData = {
        fullName: user.personalDetails.fullName,
        email: user.personalDetails.email,
        position: user.personalDetails.position,
        phoneNumber: user.personalDetails.phoneNumber,
        ...(user.companyDetails || {}),
        ...(user.addressDetails || {}),
      };
    } else {
      responseData = {
        fullName: user.fullName,
        email: user.email,
      };
    }

    return res.status(StatusCodes.OK).json({
      message: `${userType} login successful.`,
      data: responseData,
    });
  } catch (error) {
    console.error(`Error in ${userType} login:`, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};
/**
 * Utility function for logging out a user.
 * @param {Object} res - The response object.
 * @returns {Object} - The response with status and message.
 */
export const userLogout = (res) => {
  try {
    res.clearCookie("userToken", { httpOnly: true, secure: false });
    return res.status(StatusCodes.OK).json({ message: "User logged out!" });
  } catch (error) {
    console.error("Error in logout:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error!" });
  }
};
