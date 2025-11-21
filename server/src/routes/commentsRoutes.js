import express from "express";
import {
  createComment,
  getCommentsByRecipeId,
} from "../controllers/commentsController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/:recipeId", getCommentsByRecipeId);
router.post("/", authMiddleware, createComment);

export default router;
