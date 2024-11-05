// controllers/recruiterController.js
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import Recruiter from "../models/Recruiter.js";
import { generateJwt } from "../helpers/jwt.js";
import { logError } from "../utils/logUtils.js";

/**
 * Handler function to create Recruiter user account.
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createRecruiter = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    phoneNumber,
    position,
  } = req.body;

  // Check if all the required fields are provided
  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    !phoneNumber ||
    !position
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "You need to provide the required information to sign up!",
    });
  }

  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const newUser = await Recruiter.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      position,
    });

    // Query the created user and exclude the password
    const userWithoutPassword = await Recruiter.findById(newUser._id)
      .select("-password")
      .lean(); // 'lean()' returns a plain JavaScript object

    return res.status(StatusCodes.CREATED).json({
      message: "Recruiter successfully created",
      data: userWithoutPassword,
    });
  } catch (error) {
    logError("An error occurred while creating recruiter", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server error!",
    });
  }
};

/**
 * Handler function for Recruiter login.
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const recruiterLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Convert the user's email to lowercase
    const lowercaseEmail = email.toLowerCase();
    const recruiter = await Recruiter.findOne({ email: lowercaseEmail });

    if (!recruiter) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Email not found" });
    }

    // Compare the provided password with the hashed password in the database
    const matchedPassword = await bcrypt.compare(password, recruiter.password);

    if (matchedPassword) {
      // Generate a token for the user
      const token = generateJwt(recruiter._id);
      res.cookie("userToken", token, { httpOnly: true, secure: false });

      return res.status(StatusCodes.OK).json({
        message: `Login successful. Welcome, ${recruiter.firstName} ${recruiter.lastName}`,
        recruiter: {
          recruiterId: recruiter._id,
          firstName: recruiter.firstName,
          lastName: recruiter.lastName,
          username: recruiter.username,
          email: recruiter.email,
        },
      });
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Incorrect password" });
    }
  } catch (error) {
    logError("Error in recruiter login:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

/**
 * Handler function for logging Recruiter out.
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const recruiterLogout = async (req, res) => {
  try {
    res.clearCookie("userToken", { httpOnly: true, secure: false });
    return res.status(StatusCodes.OK).json({ message: "User logged out!" });
  } catch (error) {
    logError("Error in recruiter logout:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error!" });
  }
};
