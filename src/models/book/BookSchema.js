import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive", // active
    },
    slug: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    year: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    isbn: {
      type: Number,
      unique: true,
      index: 1,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: false,
    },
    expectedAvailableDate: {
      type: Date,
      default: null,
    },
    averageRating: {
      type: Number,
    },
    addedBy: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Types.ObjectId,
      },
    },
    lastUpdatedBy: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Types.ObjectId,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema); //books
