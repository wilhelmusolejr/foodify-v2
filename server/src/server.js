import express from "express";
import commentsRoutes from "./routes/commentsRoutes.js";
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

app.listen(port, () => {
  console.log("Server started on PORT:", port);
});
