import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// server status
app.get("/", (req, res, next) => {
  res.json({
    message: "Server is live",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
