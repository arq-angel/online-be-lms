// multer setup
import path from "path";
import multer from "multer";
import fs from "fs";

const __dirname = path.resolve();
const filePathDestination = "public/img";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // check if directory exist, if not create one
    !fs.existsSync(filePathDestination) &&
      fs.mkdirSync(filePathDestination, { recursive: true });

    cb(null, filePathDestination);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filePath = uniqueSuffix + "-" + file.originalname;
    cb(null, filePath);
  },
});

// filter to allow images only
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|webp|heic/; //regex

  const extName = path.extname(file.originalname).toLowerCase();

  const isAllowedExt = allowedFileTypes.test(extName);

  const mimeType = allowedFileTypes.test(file.mimetype);

  if (isAllowedExt && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg|jpg|png|gif|webp|heic are allowed"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 2 MB
});

// end multer setup
