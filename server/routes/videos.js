import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getByTag,
  getVideo,
  randomVideo,
  search,
  subVideo,
  trendyVideo,
  updateVideo,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// create a video
router.post("/", verifyToken, addVideo);

// update a video
router.put("/:id", verifyToken, updateVideo);

// delete a video
router.delete("/:id", verifyToken, deleteVideo);

// get a video
router.get("/find/:id", getVideo);

// increase video views
router.put("/view/:id", addView);

// get video on trend
router.get("/trend", trendyVideo);

// get random videos
router.get("/random", randomVideo);

// get random videos
router.get("/sub", verifyToken, subVideo);

router.get("/tags", getByTag);
router.get("/search", search);

export default router;
