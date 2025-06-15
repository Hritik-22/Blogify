import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

app.use(express.json());

// CORS
import cors from "cors";
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

// Cookie Parser
import cookieParser from "cookie-parser";
app.use(cookieParser());

// Logging
import morgan from "morgan";
app.use(morgan("dev"));

// In-memory cache
import NodeCache from "node-cache";
export const nodeCache = new NodeCache();

// DB Models - required to sync in index.js
import "./model/userModel.js";
import "./model/BlogsModel.js";
import "./model/commentModel.js";
import "./model/contactModel.js";

// Health check route
app.get("/", (req, res) => {
    return res.status(200).json({ success: true, message: "server is running" });
});

// Routes
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

app.use("/api/v1", userRoutes);
app.use("/api/v1", blogRoutes);

// Default error handler
import handleDefaultErrors from "./middleware/handleDefaultErrors.js";
app.use(handleDefaultErrors);

export default app;
