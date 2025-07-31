import BorrowSchema from "./BorrowHistorySchema.js";

// insert new borrow
export const createBorrows = (borrowsArg) => {
  return BorrowSchema.insertMany(borrowsArg);
};

// // update user
// export const updateUser = (filter, update) => {
//   return BorrowSchema.findOneAndUpdate(filter, update, { new: true });
// };

// // get user by email, @email: type string
// export const getUserByEmail = (email) => {
//   return BorrowSchema.findOne({ email });
// };

// // get one user slower process
// export const getOneUser = (filter) => {
//   return BorrowSchema.findOne(filter);
// };
