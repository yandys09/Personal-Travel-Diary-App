import express from "express";
import { verifyToken } from "./../utils/verifyUser.js";
import {
  addTravelStory,
  getAllTravelStory,
} from "../controllers/travelStory.controll.js";

const router = express.Router();

router.post("/add", verifyToken, addTravelStory);

router.get("/get-all", verifyToken, getAllTravelStory);

export default router;
