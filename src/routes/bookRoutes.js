import express from "express";
import {
  insertNewBook,
  getAllPublicBooksController,
  getAllBooksController,
  updateBookController,
  deleteBookController,
} from "../controllers/bookController.js";
import {
  userAuthMiddleware,
  adminAuthMiddleware,
} from "../middleware/authMiddleware.js";
import {
  newBookDataValidation,
  updateBookDataValidation,
} from "../middleware/validation/bookDataValidation.js";

const router = express.Router();

// admin only access
router.get(
  "/admin",
  userAuthMiddleware,
  adminAuthMiddleware,
  getAllBooksController
);

// public api access
router.get("/", getAllPublicBooksController);

// create new book
router.post(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  newBookDataValidation,
  insertNewBook
);

// update the book
router.put(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  updateBookDataValidation,
  updateBookController
);

// delete the book
router.delete(
  "/:_id",
  userAuthMiddleware,
  adminAuthMiddleware,
  deleteBookController
);

export default router;
