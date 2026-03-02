// backend/routes/productsRoutes.js

import express from "express";
import {
    getProducts,
    getProduct,
    createNewProduct,
    updateExistingProduct,
    removeProduct,
    uploadCSV
} from "../controllers/productController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// GET tutti i prodotti
router.get("/", getProducts);

// GET singolo prodotto
router.get("/:id", getProduct);

// CREA prodotto
router.post("/", upload.single("image"), createNewProduct);

// AGGIORNA prodotto
router.put("/:id", upload.single("image"), updateExistingProduct);

// ELIMINA prodotto
router.delete("/:id", removeProduct);

// IMPORT CSV
router.post("/import/csv", upload.single("file"), uploadCSV);

export default router;
