// backend/routes/authRoutes.js

import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

// LOGIN UTENTE (admin o user)
router.post("/login", login);

// REGISTRAZIONE UTENTE
router.post("/register", register);

export default router;
