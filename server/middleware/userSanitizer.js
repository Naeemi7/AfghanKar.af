import { body } from "express-validator";
import {
  uppercaseFirstLetter,
  checkUserExistenceByEmail,
  checkUserExistenceByUsername,
} from "../helpers/userHelper.js";

export const validateUserRules = [
  // Sanitize and validate the first and last name

  body(["firstName", "lastName"])
    .trim()
    .isAlpha("en-GB", { ignore: " " }) // Ignores the sames
    .customSanitizer((value) => uppercaseFirstLetter(value))
    .withMessage("The first name and last name shouldn't contain numbers"),

  // Sanitize and validate the username
  body("username")
    .trim()
    .isAlphanumeric()
    .isLength({ max: 20 })
    .withMessage("Username can't be longer than 20 characters.")
    .custom(async (value) => checkUserExistenceByUsername(value)),
  // Custom validator to check if a username already existed

  // Sanitize and validate the email
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail() // Normalize email address
    .customSanitizer((value) => value.toLowerCase()) // Convert the email to all lowercase
    .custom(async (value) => checkUserExistenceByEmail(value)),
  // Custom validator to check if an email address already existed

  // Sanitize and validate the password
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must contain at least 8 characters, at least one lowercase letter, at least on uppercase letter, at least one number, and at least one symbol."
    ),

  // Sanitize and validate the  user's role
  body("role").toLowerCase(),
];
