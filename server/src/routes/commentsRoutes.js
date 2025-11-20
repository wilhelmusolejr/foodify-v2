import express from "express";
import {
  createComment,
  getCommentsByRecipeId,
} from "../controllers/commentsController.js";

const router = express.Router();

router.get("/:recipeId", getCommentsByRecipeId);
router.post("/", createComment);

export default router;
