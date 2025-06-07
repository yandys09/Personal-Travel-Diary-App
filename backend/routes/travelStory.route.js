import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addTravelStory,
  deleteImage,
  deleteTravelStory,
  editTravelStory,
  getAllTravelStory,
  imageUpload,
  updateIsFavorite,
} from "../controllers/travelStory.controll.js";
import upload from "../multer.js";

const router = express.Router();

router.post("/image-upload", upload.single("image"), imageUpload);
router.delete("/delete-image", deleteImage);
router.post("/add", verifyToken, addTravelStory);
router.get("/get-all", verifyToken, getAllTravelStory);
router.post("/edit-story/:id", verifyToken, editTravelStory )
router.delete("/delete-story/:id", verifyToken, deleteTravelStory)
router.put("/update-is-favorite/:id", verifyToken, updateIsFavorite)

export default router;
