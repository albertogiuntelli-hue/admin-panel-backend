// backend/controllers/productController.js

import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../models/productModel.js";

import csv from "csv-parser";
import fs from "fs";

// GET TUTTI I PRODOTTI
export const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (err) {
        console.error("Errore getProducts:", err);
        res.status(500).json({ message: "Errore server" });
    }
};

// GET PRODOTTO SINGOLO
export const getProduct = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Prodotto non trovato" });
        }

        res.json(product);
    } catch (err) {
        console.error("Errore getProduct:", err);
        res.status(500).json({ message: "Errore server" });
    }
};

// CREA PRODOTTO
export const createNewProduct = async (req, res) => {
    try {
        const data = req.body;

        if (req.file) {
            data.image = req.file.filename;
        }

        const newProduct = await createProduct(data);
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Errore createNewProduct:", err);
        res.status(500).json({ message: "Errore server" });
    }
};

// AGGIORNA PRODOTTO
export const updateExistingProduct = async (req, res) => {
    try {
        const data = req.body;

        if (req.file) {
            data.image = req.file.filename;
        }

        const updated = await updateProduct(req.params.id, data);

        if (!updated) {
            return res.status(404).json({ message: "Prodotto non trovato" });
        }

        res.json(updated);
    } catch (err) {
        console.error("Errore updateExistingProduct:", err);
        res.status(500).json({ message: "Errore server" });
    }
};

// ELIMINA PRODOTTO
export const removeProduct = async (req, res) => {
    try {
        const deleted = await deleteProduct(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Prodotto non trovato" });
        }

        res.json({ message: "Prodotto eliminato" });
    } catch (err) {
        console.error("Errore removeProduct:", err);
        res.status(500).json({ message: "Errore server" });
    }
};

// UPLOAD CSV
export const uploadCSV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Nessun file CSV caricato" });
        }

        const results = [];
        const filePath = req.file.path;

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                for (const row of results) {
                    await createProduct({
                        name: row.name,
                        description: row.description,
                        price: row.price,
                        category_id: row.category_id,
                        image: row.image || null
                    });
                }

                fs.unlinkSync(filePath);
                res.json({ message: "CSV importato correttamente" });
            });
    } catch (err) {
        console.error("Errore uploadCSV:", err);
        res.status(500).json({ message: "Errore server" });
    }
};
