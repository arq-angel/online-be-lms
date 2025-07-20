import SessionSchema from "./SessionSchema.js";

// insert new session
export const createNewSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};

// delete session
export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};
