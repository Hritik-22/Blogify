import dotenv from "dotenv";
dotenv.config();

import express from "express"
const app = express();
app.use(express.json());

import handleDefaultErrors from "./middleware/handleDefaultErrors.js";
import cors from "cors"



app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

import cookieParser from "cookie-parser";
app.use(cookieParser({ origin: "*" }));

// to male Api faster - 

import morgan from "morgan";
app.use(morgan("dev")) // see api response timing* 

// most important - cashing **

import NodeCache from "node-cache";
export const nodeCache = new NodeCache();


// 
// sync all models - 

import { sequelize } from "./config/DbConnection.js";
import "./model/userModel.js";
import "./model/BlogsModel.js";
import "./model/commentModel.js";
import "./model/contactModel.js";
sequelize.sync()

import userRoutes from "./routes/userRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
app.use("/api/v1", userRoutes);
app.use("/api/v1", blogRoutes);

app.use(handleDefaultErrors);
export default app;


