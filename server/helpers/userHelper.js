import JobSeeker from "../models/JobSeeker.js";
import Recruiter from "../models/Recruiter.js";

/**
 * Helper function to capitalize the first letter of a word
 * @param {*} word
 * @returns
 */
export const uppercaseFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

/**
 * Helper function to split the full name and capitalize the first letter of both first and last name
 * @param {*} fullName
 * @returns
 */
export const splitAndCapitalizeName = (fullName) => {
  if (!fullName || fullName.trim().split(" ").length < 2) {
    throw new Error("Full name must contain both first and last names.");
  }

  // Trim and split full name into parts
  const nameParts = fullName.trim().split(/\s+/); // Split on multiple spaces if there are any

  // Ensure there are at least two name parts
  if (nameParts.length < 2) {
    throw new Error("Full name must contain both first and last names.");
  }

  const firstName = nameParts[0]; // First name is the first word
  const lastName = nameParts.slice(1).join(" "); // Join remaining parts for the last name

  // Capitalize both names
  return {
    firstName: capitalizeName(firstName),
    lastName: capitalizeName(lastName),
  };
};

/**
 * Capitalize the first letter of each word.
 * @param {string} name - The name to capitalize.
 * @returns {string} - The capitalized name.
 */
const capitalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

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
