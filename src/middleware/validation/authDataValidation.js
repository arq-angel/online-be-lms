import Joi from "joi";
import { validateData } from "./joiValidation.js";
import {
  EMAIL_REQ,
  FNAME_REQ,
  LNAME_REQ,
  PASSWORD,
  PHONE,
  SESSION_REQ,
  TOKEN_REQ,
} from "./joiConst.js";

export const newUserDataValidation = (req, res, next) => {
  // create schema or rules obj
  const obj = {
    fName: FNAME_REQ,
    lName: LNAME_REQ,
    phone: PHONE,
    email: EMAIL_REQ,
    password: PASSWORD,
  };

  return validateData({ req, res, next, obj });
};

export const userActivationDataValidation = (req, res, next) => {
  // create schema or rules obj
  const obj = {
    sessionId: SESSION_REQ,
    t: TOKEN_REQ,
  };

  return validateData({ req, res, next, obj });
};
