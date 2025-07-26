import {
  EXPECTED_AVAILABLE,
  ISBN_REQ,
  LONG_STR_REQ,
  SHORT_STR_REQ,
  STATUS_REQ,
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
    imgUrl: SHORT_STR_REQ,
    isbn: ISBN_REQ,
    genre: SHORT_STR_REQ,
  };

  return validateData({ req, res, next, obj });
};

export const updateBookDataValidation = (req, res, next) => {
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
  };

  return validateData({ req, res, next, obj });
};
