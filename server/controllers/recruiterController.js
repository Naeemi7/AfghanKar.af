// controllers/recruiterController.js
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import Recruiter from "../models/Recruiter.js";
import { logError } from "../utils/logUtils.js";
import { userLogin, userLogout } from "../utils/authUtils.js";

/**
 * Handler function to create Recruiter user account.
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createRecruiter = async (req, res) => {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    position,
    companyName,
    companyType,
    foundedIn,
    companyWebsite,
    description,
    industryType,
    companyLogo,
    country,
    state,
    city,
    street,
  } = req.body;

  // Check if all the required fields are provided
  if (
    !fullName ||
    !email ||
    !password ||
    !phoneNumber ||
    !position ||
    !companyName ||
    !companyType ||
    !foundedIn ||
    !industryType ||
    !country ||
    !state ||
    !city ||
    !street
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "You need to provide the required information to sign up!",
    });
  }

  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the recruiter with company details and address
    const newRecruiter = await Recruiter.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      position,
      companyName,
      companyType,
      foundedIn,
      companyWebsite,
      description,
      industryType,
      companyLogo,
      country,
      state,
      city,
      street,
    });

    // Query the created recruiter and exclude the password
    const recruiterWithoutPassword = await Recruiter.findById(newRecruiter._id)
      .select("-password")
      .lean(); // 'lean()' returns a plain JavaScript object

    return res.status(StatusCodes.CREATED).json({
      message: "Recruiter successfully created",
      data: recruiterWithoutPassword,
    });
  } catch (error) {
    logError("An error occurred while creating recruiter", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server error!",
    });
  }
};

/**
 * Recruiter login handler using the utility function.
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const recruiterLogin = async (req, res) => {
  const { email, password } = req.body;
  return userLogin(Recruiter, email, password, res, "recruiter");
};

/**
 * Recruiter logout handler using the utility function.
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const recruiterLogout = (req, res) => {
  return userLogout(res);
};
