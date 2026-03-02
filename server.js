import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Test route
app.get("/", (req, res) => {
    res.send("Backend funzionante!");
});

// Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);
});
