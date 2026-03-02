// backend/checkDB.js

import dotenv from "dotenv";
dotenv.config();

console.log("MONGO_URI attuale:", process.env.MONGO_URI || "mongodb://127.0.0.1:27017/plusmarket");
