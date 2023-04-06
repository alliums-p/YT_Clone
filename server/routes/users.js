import express from "express";
import {
  deleteUser,
  dislike,
  getUser,
  like,
  subscribe,
  unsubscribe,
  updateUser,
} from "../controllers/user.js";
import { verifyTokken } from "../verifyToken.js";

const router = express.Router();

// update user
router.put("/:id", verifyTokken, updateUser);

// delete user
router.delete("/:id", verifyTokken, deleteUser);

// get a user
router.get("/find/:id", getUser);

// subscribe a user
router.put("/subscribe/:id", verifyTokken, subscribe);

// unsubscribe a user
router.put("/unsubscribe/:id", verifyTokken, unsubscribe);

// like a video
router.put("/like/:id", verifyTokken, like);

// dislike a video
router.put("/dislike/:id", verifyTokken, dislike);

export default router;
