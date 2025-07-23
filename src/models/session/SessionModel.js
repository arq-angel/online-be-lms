import SessionSchema from "./SessionSchema.js";

// insert new session
export const createNewSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};

// delete session
export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};

// delete many session
export const deleteManySessions = (filter) => {
  return SessionSchema.deleteMany(filter);
};

// get session
export const getSession = (token) => {
  return SessionSchema.findOne({ token });
};

// get session with association
export const getSessionWithAssociation = (filter) => {
  return SessionSchema.findOne(filter);
};

// get session with association and delete the session
export const getSessionWithAssociationAndDeleteSession = async (filter) => {
  const session = await SessionSchema.findOne(filter);
  if (session) {
    await SessionSchema.deleteOne({ _id: session._id });
  }
  return session;
};
