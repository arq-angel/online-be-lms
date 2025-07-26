import BookSchema from "./BookSchema.js";

// insert new book
export const createNewBook = (bookObj) => {
  return BookSchema(bookObj).save();
};

// Get all public books
export const getAllPublicBooks = () => {
  return BookSchema.find({ status: "active" });
};

// Get all admin books
export const getAllBooks = (filter) => {
  return BookSchema.find(filter);
};

// update book
export const updateBook = ({ _id, ...rest }) => {
  return BookSchema.findByIdAndUpdate(_id, rest);
};

// delete book
export const deleteBook = (_id) => {
  return BookSchema.findByIdAndDelete(_id);
};
