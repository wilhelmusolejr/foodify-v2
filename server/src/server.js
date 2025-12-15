import express from "express";
import commentsRoutes from "./routes/commentsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import bookmarksRoutes from "./routes/bookmarksRoutes.js";
import mealPlanRoutes from "./routes/mealPlanRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
let port = process.env.PORT || 5001;

const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and authentication headers
};
app.use(cors(corsOptions));

connectDB();

app.use(express.json()); // <--- Middleware
app.use("/api/comment", commentsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/bookmark", bookmarksRoutes);
app.use("/api/mealplan", mealPlanRoutes);

app.listen(port, () => {
  console.log("Server started on PORT:", port);
});
