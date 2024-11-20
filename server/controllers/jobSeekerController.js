// controllers/jobSeekerController.js
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import JobSeeker from "../models/JobSeeker.js";
import { logError } from "../utils/logUtils.js";
import { userLogin, userLogout } from "../utils/authUtils.js";

/**
 * Handler function to create Job Seeker user account.
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createJobSeeker = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  // Check if all the required fields are provided
  if (!fullName || !username || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "You need to provide the required information to sign up!",
    });
  }

  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const newUser = await JobSeeker.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    // Query the created user and exclude the password
    const userWithoutPassword = await JobSeeker.findById(newUser._id)
      .select("-password")
      .lean(); // 'lean()' returns a plain JavaScript object

    return res.status(StatusCodes.CREATED).json({
      message: "Job Seeker successfully created",
      data: userWithoutPassword,
    });
  } catch (error) {
    logError("An error occurred while creating job seeker", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server error!",
    });
  }
};

/**
 * Job Seeker login handler using the utility function.
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const jobSeekerLogin = async (req, res) => {
  const { email, password } = req.body;
  return userLogin(JobSeeker, email, password, res, "jobSeeker");
};

/**
 * Job Seeker logout handler using the utility function.
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const jobSeekerLogout = (req, res) => {
  return userLogout(res);
};
