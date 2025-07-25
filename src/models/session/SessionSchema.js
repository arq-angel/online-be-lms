import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    association: {
      type: String,
    },
    expire: {
      type: Date,
      required: true,
      default: new Date(Date.now() + 1000 * 60 * 15), // 15min
      expires: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Session", sessionSchema); //sessions
