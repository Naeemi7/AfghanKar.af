import User from "../models/User.js";

/**
 * Helper to make the first letter  uppercase
 * @param {*} word
 * @returns
 */
export const uppercaseFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

/**
 * Helper to check if the user with the provided email exists
 * @param {*} value
 */
export const checkUserExistenceByEmail = async (email) => {
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new Error("A user already exists with this email address");
  }
};

/**
 * Helper to check if a username already exists
 * @param {*} value
 */
export const checkUserExistenceByUsername = async (username) => {
  const existedUsername = await User.findOne({ username });

  if (existedUsername) {
    throw new Error("A user already exists with this username");
  }
};
