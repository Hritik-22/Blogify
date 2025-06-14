import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDb } from "./config/DbConnection.js";

const port = process.env.PORT || 8080;

// Connect DB first, then start server
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error("Failed to connect to DB:", err);
});
