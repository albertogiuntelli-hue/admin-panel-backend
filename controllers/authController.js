// backend/controllers/authController.js

import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1 LIMIT 1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Utente non trovato" });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password errata" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login effettuato",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Errore login:", err);
        res.status(500).json({ message: "Errore server" });
    }
};

// REGISTRAZIONE
export const register = async (req, res) => {
    const { email, password, name, role } = req.body;

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserisci nuovo utente
        const result = await pool.query(
            `INSERT INTO users (email, password, name, role)
             VALUES ($1, $2, $3, $4)
             RETURNING id, email, name, role`,
            [email, hashedPassword, name, role || "user"]
        );

        const newUser = result.rows[0];

        res.status(201).json({
            message: "Registrazione completata",
            user: newUser,
        });
    } catch (err) {
        console.error("Errore registrazione:", err);
        res.status(500).json({ message: "Errore server" });
    }
};
