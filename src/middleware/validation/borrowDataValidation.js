import { SHORT_STR_REQ } from "./joiConst.js";
import { validateData } from "./joiValidation.js";

export const newBorrowDataValidation = (req, res, next) => {
  // create schema or rules obj
  const obj = {
    bookId: SHORT_STR_REQ,
    bookTitle: SHORT_STR_REQ,
    bookSlug: SHORT_STR_REQ,
    thumbnail: SHORT_STR_REQ,
  };

  return validateData({ req, res, next, obj });
};
