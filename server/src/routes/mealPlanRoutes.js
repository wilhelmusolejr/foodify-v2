import express from "express";
import { getUserMeal } from "../controllers/mealPlanController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/usermeal", authMiddleware, getUserMeal);

export default router;
