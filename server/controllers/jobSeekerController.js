// controllers/jobSeekerController.js
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import JobSeeker from "../models/JobSeeker.js";
import { generateJwt } from "../helpers/jwt.js";
import { logError } from "../utils/logUtils.js";

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
 * Handler function for Job Seeker login.
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const jobSeekerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Normalize the email to lowercase
    const lowercaseEmail = email.toLowerCase();
    const jobSeeker = await JobSeeker.findOne({ email: lowercaseEmail });

    if (!jobSeeker) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Email not found" });
    }

    // Compare the provided password with the hashed password in the database
    const matchedPassword = await bcrypt.compare(password, jobSeeker.password);

    if (matchedPassword) {
      // Extract first name and last name from fullName
      const [firstName, ...lastNameParts] = jobSeeker.fullName.split(" ");
      const lastName = lastNameParts.join(" ");

      // Generate a token for the user
      const token = generateJwt(jobSeeker._id);
      res.cookie("userToken", token, { httpOnly: true, secure: false });

      // Exclude sensitive data like password from the response
      const { password, ...jobSeekerData } = jobSeeker.toObject();

      return res.status(StatusCodes.OK).json({
        message: `Login successful. Welcome, ${firstName} ${lastName}`,
        jobSeeker: {
          ...jobSeekerData,
          firstName,
          lastName,
        },
      });
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Incorrect password" });
    }
  } catch (error) {
    logError("Error in job seeker login:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};
/**
 * Handler function for logging Job Seeker out.
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const jobSeekerLogout = async (req, res) => {
  try {
    res.clearCookie("userToken", { httpOnly: true, secure: false });
    return res
      .status(StatusCodes.OK)
      .json({ message: "Job Seeker logged out!" });
  } catch (error) {
    logError("Error in job seeker logout:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error!" });
  }
};
