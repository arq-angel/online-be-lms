import express, { json } from "express";

const app = express();
const PORT = process.env.PORT || 8000;

// DB connection
import { dbConnect } from "./src/config/dbConfig.js";

// middlewares
import cors from "cors";
import morgan from "morgan";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// api endpoints
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import bookRoutes from "./src/routes/bookRoutes.js";
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRoutes);

// server status
import { responseClient } from "./src/middleware/responseClient.js";
app.get("/", (req, res, next) => {
  const message = "Server is live";
  responseClient({ req, res, message });
});

// error handler middleware
import { errorHandler } from "./src/middleware/errorHandler.js";
app.use(errorHandler);

dbConnect()
  .then(() => {
    console.log("DB Connected");

    // start the server
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
