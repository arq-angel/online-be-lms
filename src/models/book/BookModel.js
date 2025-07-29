import BookSchema from "./BookSchema.js";

// insert new book
export const createNewBook = (bookObj) => {
  return BookSchema(bookObj).save();
};

// insert many books
export const createManyBooks = (booksArg) => {
  return BookSchema.insertMany(booksArg);
};

// empty the table
export const emptyBooks = () => {
  return BookSchema.deleteMany();
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

// Find single book, filter = {slug, status = "active"}
export const findABook = (filter) => {
  return BookSchema.findOne(filter);
};
