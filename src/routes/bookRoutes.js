import express from "express";
import {
  insertNewBook,
  getAllPublicBooksController,
  getAllBooksController,
} from "../controllers/bookController.js";
import {
  userAuthMiddleware,
  adminAuthMiddleware,
} from "../middleware/authMiddleware.js";
import { newBookDataValidation } from "../middleware/validation/bookDataValidation.js";

const router = express.Router();

// create new book
router.post(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  newBookDataValidation,
  insertNewBook
);

// public api access
router.get("/", getAllPublicBooksController);

// admin only access
router.get(
  "/admin",
  userAuthMiddleware,
  adminAuthMiddleware,
  getAllBooksController
);

export default router;
