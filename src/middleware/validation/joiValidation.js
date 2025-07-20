import Joi from "joi";
import { responseClient } from "../responseClient.js";

export const validateData = ({ req, res, next, obj }) => {
  console.log(req.body);

  // create schema or rules
  const schema = Joi.object(obj);

  // pass your data, req.body to the schema
  const { error } = schema.validate(req.body);

  if (error) {
    return responseClient({
      req,
      res,
      message: error.message,
      statusCode: 400,
    });
  }

  // if pass go next() or response error from here
  next();
};
