import mongoose from "mongoose";

export const dbConnect = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("Provide MONGO_URL connection string");
  }
  return mongoose.connect(process.env.MONGO_URL);
};

// export const dbConnect = async () => {
//   try {
//     if (!process.env.MONGO_URL) {
//       throw new Error("Provide MONGO_URL connection string");
//     }
//     // const conn = await mongoose.connect(process.env.MONGO_URL);
//     // conn && console.log("MongoDB is connected");
//   } catch (error) {
//     console.log(error);
//   }
// };
