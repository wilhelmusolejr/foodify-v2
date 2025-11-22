import express from "express";
import {
  createComment,
  getCommentsByRecipeId,
  getUserComments,
} from "../controllers/commentsController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/:recipeId", getCommentsByRecipeId);
router.post("/", authMiddleware, createComment);
router.get("/getUserComments/:user_id", getUserComments);

export default router;
