import mongoose from "mongoose";

const MONGODB_URL: string =
  "mongodb+srv://asim:dantheman55@cluster0.2gekd.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error(err);
  });
