import express from "express";
import { getUserMeal, addUserMeal } from "../controllers/mealPlanController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/usermeal", authMiddleware, getUserMeal);
router.post("/usermeal", authMiddleware, addUserMeal);

export default router;
