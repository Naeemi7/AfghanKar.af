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
    const user = await userModel.findOne({ email: lowercaseEmail });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Email not found" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (matchedPassword) {
      const token = generateJwt(user._id);
      res.cookie("userToken", token, { httpOnly: true, secure: false });

      // Define response structure based on userType
      let userData;

      // Exclude password from response
      const { password: _, fullName, ...userWithoutPassword } = user.toObject(); // Exclude password

      // Split fullName into firstName and lastName
      const [firstName, lastName] = fullName
        ? fullName
            .split(" ")
            .map(
              (name) =>
                name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
            )
        : [null, null];

      if (userType === "recruiter") {
        userData = {
          firstName,
          lastName,
          email: userWithoutPassword.email,
          phoneNumber: userWithoutPassword.phoneNumber,
          position: userWithoutPassword.position,
          companyName: userWithoutPassword.companyName,
          companyType: userWithoutPassword.companyType,
          foundedIn: userWithoutPassword.foundedIn,
          companyWebsite: userWithoutPassword.companyWebsite,
          description: userWithoutPassword.description,
          industryType: userWithoutPassword.industryType,
          companyLogo: userWithoutPassword.companyLogo,
          country: userWithoutPassword.country,
          state: userWithoutPassword.state,
          city: userWithoutPassword.city,
          street: userWithoutPassword.street,
        };
      } else {
        userData = {
          userId: userWithoutPassword._id,
          firstName,
          lastName,
          email: userWithoutPassword.email,
          position: userWithoutPassword.position || null,
        };
      }

      return res.status(StatusCodes.OK).json({
        message: `${userType} login successful. Welcome, ${firstName} ${lastName}`,
        [userType]: userData,
      });
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Incorrect password" });
    }
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
