import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateJwt } from "../helpers/jwt.js";
import { logError } from "../utils/logUtils.js";

/**
 * Handler function for creating user accounts
 * @param {*} req
 * @param {*} res
 */
export const createUser = async (req, res) => {
  const { firstName, lastName, username, email, password, role } = req.body;

  try {
    // Check if all required fields are provided
    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "You need to provide the required information to sign up!",
      });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user and immediately exclude the password field from the result
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Query the created user and exclude the password directly in the MongoDB query
    const userWithoutPassword = await User.findById(newUser._id)
      .select("-password")
      .lean(); // `lean()` returns a plain JavaScript object

    // Return a success response with the sanitized user object
    return res.status(StatusCodes.OK).json({
      message: "User successfully created",
      data: userWithoutPassword,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error!" });
  }
};

/**
 * Handler function for logging users in
 * @param {*} req
 * @param {*} res
 */
export const loginUser = async (req, res) => {
  try {
    // Convert the user's email to lowercase
    const lowercaseEmail = req.body.email.toLowerCase();

    // Find the user with the provided lowercase email
    const user = await User.findOne({ email: lowercaseEmail });

    // If the user is not found, return a 404 Not Found status
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Email not found" });
    }

    // Compare the provided password with the hashed password in the database
    const matchedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // If the password matches
    if (matchedPassword) {
      // Generate a token for the user
      const token = generateJwt(user._id);

      // Set the token as an HTTP-only cookie
      res.cookie("userToken", token, {
        httpOnly: true,
        secure: false,
      });

      // Return a successful response
      return res.status(StatusCodes.OK).json({
        message: `Login successful. Welcome, ${user.firstName} ${user.lastName}`,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          role: user.role,
          userId: user._id,
        },
      });
    } else {
      // If the password is incorrect, return a 401 Unauthorized status
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Incorrect password" });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in loginUser:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

/**
 * Handler function for logging the users out
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: false,
    });

    return res.status(StatusCodes.OK).json({ message: "user logged out!" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error!" });
  }
};
