import UserSchema from "./UserSchema.js";

// insert new user
export const createNewUser = (userObj) => {
  return UserSchema(userObj).save();
};
