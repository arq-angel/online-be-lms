import { ISBN_REQ, LONG_STR_REQ, SHORT_STR_REQ, YEAR_REQ } from "./joiConst.js";
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
