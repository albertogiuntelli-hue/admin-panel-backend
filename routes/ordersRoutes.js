import express from "express";
import {
    createOrder,
    getOrders,
    updateOrderStatus
} from "../controllers/ordersController.js";

const router = express.Router();

// Crea un nuovo ordine
router.post("/", createOrder);

// Ottieni tutti gli ordini
router.get("/", getOrders);

// Aggiorna lo stato di un ordine
router.put("/:id/status", updateOrderStatus);

export default router;
