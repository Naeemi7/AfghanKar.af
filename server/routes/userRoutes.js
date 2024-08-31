import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";
import { userValidator } from "../middleware/userValidator.js";
import { validateUserRules } from "../middleware/userSanitizer.js";

const router = express.Router();

// Unprotected Routes
router.post("/register", validateUserRules, userValidator, createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
