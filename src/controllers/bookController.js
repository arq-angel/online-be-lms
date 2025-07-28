import { responseClient } from "../middleware/responseClient.js";
import {
  createNewBook,
  getAllPublicBooks,
  getAllBooks,
  updateBook,
  deleteBook,
} from "../models/book/BookModel.js";
import slugify from "slugify";
import { deleteFile, deleteUploadedFiles } from "../utils/fileUtil.js";

export const insertNewBook = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    const { path } = req.file;

    const obj = {
      ...req.body,

      slug: slugify(req.body.title, { lower: true }),
      addedBy: {
        name: fName,
        adminId: _id,
      },
      lastUpdatedBy: {
        name: fName,
        adminId: _id,
      },
      imgUrl: path,
      imageList: Array.isArray(path) ? [...path] : [path],
    };

    const book = await createNewBook(obj);

    book?._id
      ? responseClient({
          req,
          res,
          message: "The book has been added successfully",
        })
      : responseClient({
          req,
          res,
          message: "Unable to insert new book in the database, try again later",
        });
  } catch (error) {
    if (req.file || Array.isArray(req.files)) {
      // proceed to delete the uploaded file
      deleteUploadedFiles(req);
    }
    if (error.message.includes("E11000 duplicate key")) {
      responseClient({
        req,
        res,
        message:
          "Duplicate data not allowed: " + JSON.stringify(error.keyValue),
        statusCode: 400,
      });
      return;
    }

    next(error);
  }
};

export const getAllPublicBooksController = async (req, res, next) => {
  try {
    const payload = await getAllPublicBooks();

    responseClient({
      req,
      res,
      payload,
      message: "Books have been fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBooksController = async (req, res, next) => {
  try {
    const payload = await getAllBooks();

    responseClient({
      req,
      res,
      payload,
      message: "Books have been fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookController = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;

    console.log(req.body);
    req.body.imageList = req.body.imageList.split(",");

    // remove imgToDelete list from imageList
    if (req.body.imgToDelete.length) {
      req.body.imageList = req.body.imageList.filter(
        (img) => !req.body.imgToDelete.includes(img)
      );

      req.body.imgToDelete.map((img) => deleteFile(img));
    }

    if (Array.isArray(req.files)) {
      req.body.imageList = [
        ...req.body.imageList,
        ...req.files.map((obj) => obj.path),
      ];
    }

    const obj = {
      ...req.body,
      lastUpdatedBy: {
        name: fName,
        adminId: _id,
      },
    };

    const book = await updateBook(obj);

    book?._id
      ? responseClient({
          req,
          res,
          message: "The book has been updated successfully",
        })
      : responseClient({
          req,
          res,
          message: "Unable to update book in the database, try again later",
          statusCode: 400,
        });
  } catch (error) {
    next(error);
  }
};

export const deleteBookController = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const book = await deleteBook(_id);

    book.imageList.map((img) => deleteFile(img));

    book?._id
      ? responseClient({
          req,
          res,
          message: "The book has been deleted successfully",
        })
      : responseClient({
          req,
          res,
          message: "Unable to delete book from the database, try again later",
          statusCode: 400,
        });
  } catch (error) {
    next(error);
  }
};
