import { responseClient } from "../middleware/responseClient.js";
import { createBorrows } from "../models/BorrowHistory/BorrowHistoryModel.js";

const BOOK_DUE_DAYS = 15;

export const insertNewBorrow = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;

    let today = new Date();
    const dueDate = today.setDate(today.getDate() + BOOK_DUE_DAYS);

    req.body = req.body.map((book) => {
      return {
        ...book,
        userId: _id,
        dueDate,
      };
    });

    const borrows = await createBorrows(req.body);

    Array.isArray(borrows)
      ? responseClient({
          req,
          res,
          message: "The borrow has been added successfully",
          payload: borrows,
        })
      : responseClient({
          req,
          res,
          message:
            "Unable to insert new borrow in the database, try again later",
        });
  } catch (error) {
    next(error);
  }
};
