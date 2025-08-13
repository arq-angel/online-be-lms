import BorrowSchema from "./BorrowHistorySchema.js";

// insert new borrow
export const createBorrows = (borrowsArg) => {
  return BorrowSchema.insertMany(borrowsArg);
};

// user filter to get borrows for specific user
// if @filter is undefined, it will return entire records
export const getBorrows = (filter) => {
  return BorrowSchema.find(filter);
};

// update borrow table
export const updateBorrow = (filter, obj) => {
  return BorrowSchema.findOneAndUpdate(filter, obj);
};
