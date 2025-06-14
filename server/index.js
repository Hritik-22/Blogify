import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
console.log(process.env.PORT);
const port = process.env.PORT;
import { connectDb } from "./config/DbConnection.js";


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
    connectDb();
})
