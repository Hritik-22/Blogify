import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const port = process.env.PORT || 8080;
import { connectDb } from "./config/DbConnection.js";


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
    connectDb();
})