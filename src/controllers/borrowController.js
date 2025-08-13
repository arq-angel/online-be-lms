import { responseClient } from "../middleware/responseClient.js";
import { updateBook } from "../models/book/BookModel.js";
import {
  createBorrows,
  getBorrows,
  updateBorrow,
} from "../models/BorrowHistory/BorrowHistoryModel.js";

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

    if (borrows.length) {
      // update book table with expectedAvailableDate = dueDate
      borrows.map(async ({ bookId }) => {
        await updateBook({ _id: bookId, expectedAvailable: dueDate });
      });
    }

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

export const getBorrowsController = async (req, res, next) => {
  try {
    const { _id, role } = req.userInfo;

    const path = req.path;

    const isAdmin = path === "/admin";

    const borrows = isAdmin
      ? await getBorrows()
      : await getBorrows({ userId: _id });

    Array.isArray(borrows)
      ? responseClient({
          req,
          res,
          message: "Here is the borrows list",
          payload: borrows,
        })
      : responseClient({
          req,
          res,
          message: "Unable to fetch borrows from the database, try again later",
        });
  } catch (error) {
    next(error);
  }
};

export const returnBookController = async (req, res, next) => {
  try {
    // get the user id and borrow id
    const { _id } = req.userInfo;

    // update the borrow table
    const filter = {
      _id: req.body?._id,
      userId: _id,
    };
    const obj = {
      isReturned: true,
      returnedDate: Date.now(),
    };

    const result = await updateBorrow(filter, obj);

    console.log(filter, obj);

    if (result?._id) {
      // update book table, expectedAvailable = null

      const updatedBook = await updateBook({
        _id: result?.bookId,
        expectedAvailable: null,
      });

      if (updatedBook?._id) {
        // book returned successfully
        responseClient({
          req,
          res,
          message: "Your book has been returned successfully",
        });
      }
    }

    // TODO: send email notification

    responseClient({
      req,
      res,
      message: "Unable to return the book. Please contact admin!",
      statusCode: 400,
    });
  } catch (error) {
    next(error);
  }
};
