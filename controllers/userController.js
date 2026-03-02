// backend/controllers/userController.js

import pool from "../config/db.js";

// GET TUTTI GLI UTENTI
export const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT id, name, email, role FROM users ORDER BY id ASC");
        res.json(result.rows);
    } catch (err) {
        console.error("Errore getUsers:", err);
        res.status(500).json({ message: "Errore server" });
    }
};

// GET UTENTE SINGOLO
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "SELECT id, name, email, role FROM users WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Utente non trovato" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Errore getUserById:", err);
        res.status(500).json({ message: "Errore server" });
    }
};

// CREA NUOVO UTENTE (senza password)
export const createUser = async (req, res) => {
    const { name, email, role } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO users (name, email, role)
             VALUES ($1, $2, $3)
             RETURNING id, name, email, role`,
            [name, email, role || "user"]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Errore createUser:", err);
        res.status(500).json({ message: "Errore server" });
    }
};

// AGGIORNA UTENTE
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    try {
        const result = await pool.query(
            `UPDATE users
             SET name = $1, email = $2, role = $3
             WHERE id = $4
             RETURNING id, name, email, role`,
            [name, email, role, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Utente non trovato" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Errore updateUser:", err);
        res.status(500).json({ message: "Errore server" });
    }
};

// ELIMINA UTENTE
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM users WHERE id = $1 RETURNING id",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Utente non trovato" });
        }

        res.json({ message: "Utente eliminato" });
    } catch (err) {
        console.error("Errore deleteUser:", err);
        res.status(500).json({ message: "Errore server" });
    }
};
