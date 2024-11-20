import JobSeeker from "../models/JobSeeker.js";
import Recruiter from "../models/Recruiter.js";

/**
 * Helper to capitalize first letter of each word in a string
 * @param {*} str
 * @returns
 */
export const capitalizeWords = (str) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

/**
 * Helper to check if a user with the provided email exists
 * @param {*} email
 * @param {*} userType - "jobSeeker" or "recruiter"
 */
export const checkUserExistenceByEmail = async (email, userType) => {
  let existedUser;

  if (userType === "jobSeeker") {
    existedUser = await JobSeeker.findOne({ email });
  } else if (userType === "recruiter") {
    existedUser = await Recruiter.findOne({ email });
  }

  if (existedUser) {
    throw new Error("A user already exists with this email address");
  }
};

/**
 * Helper to check if a username already exists
 * @param {*} username
 * @param {*} userType - "jobSeeker" or "recruiter"
 */
export const checkUserExistenceByUsername = async (username, userType) => {
  let existedUsername;

  if (userType === "jobSeeker") {
    existedUsername = await JobSeeker.findOne({ username });
  } else if (userType === "recruiter") {
    existedUsername = await Recruiter.findOne({ username });
  }

  if (existedUsername) {
    throw new Error("A user already exists with this username");
  }
};
