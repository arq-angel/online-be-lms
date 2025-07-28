import {
  EXPECTED_AVAILABLE,
  ISBN_REQ,
  LONG_STR,
  LONG_STR_REQ,
  SHORT_STR_REQ,
  STATUS_REQ,
  STR_ARRAY,
  YEAR_REQ,
  _ID_REQ,
} from "./joiConst.js";
import { validateData } from "./joiValidation.js";

export const newBookDataValidation = (req, res, next) => {
  // create schema or rules obj
  const obj = {
    title: SHORT_STR_REQ,
    description: LONG_STR_REQ,
    year: YEAR_REQ,
    author: SHORT_STR_REQ,
    // imgUrl: SHORT_STR_REQ,
    isbn: ISBN_REQ,
    genre: SHORT_STR_REQ,
  };

  return validateData({ req, res, next, obj });
};

export const updateBookDataValidation = (req, res, next) => {
  req.body.expectedAvailable =
    req.body.expectedAvailable === "null" ? null : req.body.expectedAvailable;

  // Normalize to an array
  // when there is only one value in the formData it is converted to string
  // e.g. while selecting only one image to delete
  req.body.imgToDelete = Array.isArray(req.body.imgToDelete)
    ? req.body.imgToDelete
    : req.body.imgToDelete
    ? [req.body.imgToDelete]
    : [];

  // create schema or rules obj
  const obj = {
    _id: _ID_REQ,
    status: STATUS_REQ,
    title: SHORT_STR_REQ,
    description: LONG_STR_REQ,
    year: YEAR_REQ,
    author: SHORT_STR_REQ,
    imgUrl: SHORT_STR_REQ,
    genre: SHORT_STR_REQ,
    expectedAvailable: EXPECTED_AVAILABLE,
    imageList: LONG_STR_REQ.allow(""),
    imgToDelete: STR_ARRAY,
  };

  return validateData({ req, res, next, obj });
};
