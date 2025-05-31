import TravelStory from "../models/travelStory.model.js";
import { errorHandler } from "../utils/error.js";

export const addTravelStory = async (req, res, next) => {
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
  const userId = req.user.id;

  // validate required field
  if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
    return next(errorHandler(400, "All fields are required"));
  }

  // convert visited date from milliseconds to Date Object
  const parsedVisitedDate = new Date(parseInt(visitedDate));

  try {
    const travelStory = new TravelStory({
      title,
      story,
      visitedLocation,
      userId,
      imageUrl,
      visitedDate: parsedVisitedDate,
    });

    await travelStory.save();

    res
      .status(201)
      .json({ story: true, message: "You story is added successfully!." });
  } catch (error) {
    next(error);
  }
};

export const getAllTravelStory = async (req, res, nect) => {
  const userId = req.user.id;

  try {
    const travelStories = await TravelStory.find({ userId: userId }).sort({
      isFavorite: -1,
    });

    res.status(200).json({ stories: travelStories})
  } catch (error) {
    next(error);
  }
};

export const imageUpload = async(req, res, next) => {
  try {
    if(!req.file){
      return next(errorHandler(400, "No image uploaded."))
    }

    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`

    res.status(201).json({ imageUrl})
  } catch (error) {
    next(error)
  }
}