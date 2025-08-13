import express from "express";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middleware/authMiddleware.js";
import {
  getBorrowsController,
  insertNewBorrow,
  returnBookController,
} from "../controllers/borrowController.js";
import { newBorrowDataValidation } from "../middleware/validation/borrowDataValidation.js";

const router = express.Router();

// insert new borrow
router.post("/", userAuthMiddleware, newBorrowDataValidation, insertNewBorrow);

// return all borrows for admin request only
router.get(
  "/admin",
  userAuthMiddleware,
  adminAuthMiddleware,
  getBorrowsController
);

// return user specific borrows list only
router.get("/user", userAuthMiddleware, getBorrowsController);

// return the book back to the library
router.patch("/", userAuthMiddleware, returnBookController);

export default router;
