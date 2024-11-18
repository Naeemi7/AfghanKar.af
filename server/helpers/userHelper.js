import JobSeeker from "../models/JobSeeker.js";
import Recruiter from "../models/Recruiter.js";

/**
 * Helper function to split the full name and capitalize the first letter of both first and last name
 * @param {*} fullName
 * @returns
 */
export const splitAndCapitalizeName = (fullName) => {
  // Check if fullName is provided and not empty
  if (!fullName || fullName.trim() === "") {
    throw new Error("Full name is missing.");
  }

  // Trim and split the full name into parts (split by spaces)
  const nameParts = fullName.trim().split(/\s+/); // Split on multiple spaces if any

  // If there is only one part (first name), throw an error for missing last name
  if (nameParts.length === 1) {
    throw new Error("The full name must contain both first and last names.");
  }

  // If both names are present, capitalize first and last names
  const firstName = nameParts[0]; // First name
  const lastName = nameParts.slice(1).join(" "); // Last name (joins multiple parts if needed)

  // Return capitalized names
  return {
    firstName: capitalizeName(firstName),
    lastName: capitalizeName(lastName),
  };
};

/**
 * Capitalize the first letter of a name.
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
