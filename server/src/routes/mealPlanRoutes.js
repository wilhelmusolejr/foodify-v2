import express from "express";
import {
  getUserMeal,
  addUserMeal,
  deleteUserMeal,
} from "../controllers/mealPlanController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/usermeal", authMiddleware, getUserMeal);
router.post("/usermeal", authMiddleware, addUserMeal);
router.delete("/usermeal", authMiddleware, deleteUserMeal);

export default router;
