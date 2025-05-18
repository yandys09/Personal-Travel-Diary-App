import express from "express";
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database is connected!!.".bgCyan);
  })
  .catch((err) => {
    console.log("err : ".bgRed, err);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000!.".bgMagenta);
});
