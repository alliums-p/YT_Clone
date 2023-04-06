import express from "express";
import { signin, signup } from "../controllers/auth.js";

const router = express.Router();

// Create a user
router.post("/signup", signup);

// Sign In
router.post("/signin", signin);

// Google Auth
// router.post("/google-signup", )

export default router;
