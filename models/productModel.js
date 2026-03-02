// backend/models/productModel.js

import pool from "../config/db.js";

// Ottieni tutti i prodotti
export const getAllProducts = async () => {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    return result.rows;
};

// Ottieni un singolo prodotto
export const getProductById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

// Crea un nuovo prodotto
export const createProduct = async (data) => {
    const { name, description, price, category_id, image } = data;

    const result = await pool.query(
        `INSERT INTO products (name, description, price, category_id, image)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [name, description, price, category_id, image]
    );

    return result.rows[0];
};

// Aggiorna un prodotto
export const updateProduct = async (id, data) => {
    const { name, description, price, category_id, image } = data;

    const result = await pool.query(
        `UPDATE products
         SET name = $1, description = $2, price = $3, category_id = $4, image = $5
         WHERE id = $6
         RETURNING *`,
        [name, description, price, category_id, image, id]
    );

    return result.rows[0];
};

// Elimina un prodotto
export const deleteProduct = async (id) => {
    const result = await pool.query(
        "DELETE FROM products WHERE id = $1 RETURNING id",
        [id]
    );

    return result.rows[0];
};
