import { dbConnect } from "../../config/dbConfig.js";
import { createManyBooks, emptyBooks } from "../../models/book/BookModel.js";
import bookData from "./book-seeds.js";

const importData = async () => {
  try {
    await dbConnect();
    await emptyBooks();
    await createManyBooks(bookData);
    console.log("All the books have been imported successfully!");
  } catch (error) {
    console.log(error);
  }
};

importData();
