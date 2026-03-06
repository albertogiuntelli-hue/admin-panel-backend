import dotenv from 'dotenv';
dotenv.config();

import { pool } from './config/db.js';

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS prodotti (
        id SERIAL PRIMARY KEY,
        codice TEXT,
        nome TEXT NOT NULL,
        descrizione TEXT,
        prezzo NUMERIC(10,2),
        prezzo_scontato NUMERIC(10,2),
        categoria TEXT,
        disponibile BOOLEAN DEFAULT TRUE,
        immagine TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Tabella 'prodotti' creata o già esistente.");
    process.exit(0);
  } catch (err) {
    console.error("Errore creazione tabella:", err);
    process.exit(1);
  }
};

createTable();
