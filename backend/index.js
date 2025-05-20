import express from "express";
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";

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

//for allowing json object in req body
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000!.".bgMagenta);
});

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
});
