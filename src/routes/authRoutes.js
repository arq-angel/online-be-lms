import express from "express";
import { activateUser, insertNewUser } from "../controllers/authController.js";
import {
  newUserDataValidation,
  userActivationDataValidation,
} from "../middleware/validation/authDataValidation.js";

const router = express.Router();

// User signup
router.post("/register", newUserDataValidation, insertNewUser);

// activate user account
router.post("/activate-user", userActivationDataValidation, activateUser);

export default router;
