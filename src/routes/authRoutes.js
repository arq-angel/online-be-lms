import express from "express";
import {
  activateUser,
  generateOTP,
  insertNewUser,
  loginUser,
  logoutUser,
  resetNewPassword,
} from "../controllers/authController.js";
import {
  loginDataValidation,
  newPasswordResetValidation,
  newUserDataValidation,
  resetPasswordEmailValidation,
  userActivationDataValidation,
} from "../middleware/validation/authDataValidation.js";
import {
  renewAccessJWTMiddleware,
  userAuthMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// User signup
router.post("/register", newUserDataValidation, insertNewUser);

// activate user account
router.post("/activate-user", userActivationDataValidation, activateUser);

// User login
router.post("/login", loginDataValidation, loginUser);

// renew accessJWT
router.get("/renew-jwt", renewAccessJWTMiddleware);

// logout
router.get("/logout", userAuthMiddleware, logoutUser);

// otp
router.post("/otp", resetPasswordEmailValidation, generateOTP);

// reset password
router.post("/reset-password", newPasswordResetValidation, resetNewPassword);

export default router;
