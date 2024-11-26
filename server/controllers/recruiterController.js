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
  const { personalDetails, companyDetails, addressDetails } = req.body;

  if (!personalDetails || !companyDetails || !addressDetails) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "You need to provide the required information to sign up!",
    });
  }

  const { fullName, email, password, phoneNumber, position } = personalDetails;

  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Email is required!",
    });
  }

  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the recruiter
    const newRecruiter = await Recruiter.create({
      personalDetails: {
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
        position,
      },
      companyDetails,
      addressDetails,
    });

    const recruiterWithoutPassword = await Recruiter.findById(newRecruiter._id)
      .select("-personalDetails.password")
      .lean();

    return res.status(StatusCodes.CREATED).json({
      message: "Recruiter successfully created",
      data: recruiterWithoutPassword,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(StatusCodes.CONFLICT).json({
        message:
          "The provided email is already in use. Please use a different email.",
      });
    }
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
