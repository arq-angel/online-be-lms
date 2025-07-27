import { unlink } from "fs";
import { resolve } from "path";

// actually deletes the file
const deleteFile = (filePath) => {
  try {
    unlink(resolve(filePath), () => {
      // console log
      console.log(filePath, "File has been deleted");
    });
  } catch (error) {
    console.log(error);
  }
};

// is single file or array of files to be deleted
export const deleteUploadedFiles = (req) => {
  // single file
  if (req.file) {
    deleteFile(req.file.path);
    return;
  }

  // mulitple files
  if (req.files) {
    req.files.map((f) => {
      deleteFile(f.path);
    });
    return;
  }
};
