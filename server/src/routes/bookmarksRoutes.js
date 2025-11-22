import express from "express";
import {
  getUserBookmarks,
  hasUserBookmarked,
  saveBookmark,
} from "../controllers/BookmarkController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, saveBookmark);
router.get("/status", authMiddleware, hasUserBookmarked);
router.get("/getUserBookmarks/:user_id", getUserBookmarks);

export default router;
