import { deleteUploadedFiles } from "../utils/fileUtil.js";
import { responseClient } from "./responseClient.js";

export const errorHandler = (error, req, res, next) => {
  if (req.file || Array.isArray(req.files)) {
    // proceed to delete the uploaded file
    deleteUploadedFiles(req);
  }

  const statusCode = error.statusCode || 500;

  const message = error.message;
  responseClient({ req, res, message, statusCode });
};
