import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { sequelize } from "./config/DbConnection.js";

const port = process.env.PORT || 8080;

async function startServer() {
  try {
    await sequelize.sync(); // Ensure DB is connected/synced
    console.log("MySQL DB Connection has been established successfully");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1); // Exit on DB error
  }
}

startServer();
