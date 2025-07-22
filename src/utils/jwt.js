import jwt from "jsonwebtoken";
import { createNewSession } from "../models/session/SessionModel.js";
import { updateUser } from "../models/user/UserModel.js";

// generate accessJWT
export const createAccessJWT = async (email) => {
  // create
  const token = jwt.sign({ email }, process.env.ACCESSJWT_SECRET, {
    expiresIn: "15m",
  });
  // store
  const obj = {
    token,
    association: email,
    default: new Date(Date.now() + 15 * 60 * 1000), //15 mins
  };

  const newSession = await createNewSession(obj);
  return newSession?._id ? token : null;
};

// decode accessJWt
export const verifyAccessJWT = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESSJWT_SECRET);
  } catch (error) {
    return error.message;
  }
};

// generate refreshJWT
export const createRefreshJWT = async (email) => {
  // create
  const refreshJWT = jwt.sign({ email }, process.env.REFRESHJWT_SECRET, {
    expiresIn: "30d",
  });

  // store
  const user = await updateUser({ email }, { refreshJWT });

  return user?._id ? refreshJWT : null;
};

// deocde refreshJWT
export const verifyRefreshJWT = async (token) => {
  try {
    return jwt.verify(token, process.env.REFRESHJWT_SECRET);
  } catch (error) {
    return error.message;
  }
};

// export both tokens
export const getJwts = async (email) => {
  return {
    accessJWT: await createAccessJWT(email),
    refreshJWT: await createRefreshJWT(email),
  };
};
