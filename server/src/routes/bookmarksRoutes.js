import express from "express";
import {
  hasUserBookmarked,
  saveBookmark,
} from "../controllers/BookmarkController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, saveBookmark);
router.get("/status", authMiddleware, hasUserBookmarked);

export default router;
