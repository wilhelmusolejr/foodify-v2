import express from "express";
import { getUser, updateProfile } from "../controllers/usersController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/profile/:id", getUser);
router.post("/updateProfile", authMiddleware, updateProfile);

export default router;
