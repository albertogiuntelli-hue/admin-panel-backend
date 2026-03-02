import express from "express";
import protect from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import { getUsers } from "../controllers/userController.js";

const router = express.Router();

// Admin: lista utenti
router.get("/", protect, admin, getUsers);

export default router;
