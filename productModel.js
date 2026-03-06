import { pool } from "../config/db.js";

export const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM prodotti");
  return result.rows;
};

export const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM prodotti WHERE id = $1", [id]);
  return result.rows[0];
};

export const createProduct = async (data) => {
  const { nome, descrizione, prezzo } = data;
  const result = await pool.query(
    "INSERT INTO prodotti (nome, descrizione, prezzo) VALUES ($1, $2, $3) RETURNING *",
    [nome, descrizione, prezzo]
  );
  return result.rows[0];
};

export const updateProduct = async (id, data) => {
  const { nome, descrizione, prezzo } = data;
  const result = await pool.query(
    "UPDATE prodotti SET nome = $1, descrizione = $2, prezzo = $3 WHERE id = $1 RETURNING *",
    [nome, descrizione, prezzo, id]
  );
  return result.rows[0];
};

export const deleteProduct = async (id) => {
  await pool.query("DELETE FROM prodotti WHERE id = $1", [id]);
  return true;
};
