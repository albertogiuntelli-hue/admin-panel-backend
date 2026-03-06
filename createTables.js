import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

async function createTables() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log("🔌 Connessione al database...");
    await client.connect();

    // Elimina la tabella order_items (dipende da products)
    await client.query(`DROP TABLE IF EXISTS order_items CASCADE;`);
    console.log("🗑️ Tabella 'order_items' eliminata (se esisteva)");

    // Elimina la tabella orders (dipende da users)
    await client.query(`DROP TABLE IF EXISTS orders CASCADE;`);
    console.log("🗑️ Tabella 'orders' eliminata (se esisteva)");

    // Elimina la tabella products con CASCADE
    await client.query(`DROP TABLE IF EXISTS products CASCADE;`);
    console.log("🗑️ Tabella 'products' eliminata (se esisteva)");

    // Ricrea la tabella products identica al CSV
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        codice VARCHAR(50),
        nome VARCHAR(255),
        descrizione TEXT,
        prezzo NUMERIC(10,2),
        prezzo_scontato NUMERIC(10,2),
        categoria VARCHAR(255),
        disponibile BOOLEAN,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✔️ Tabella 'products' ricreata correttamente");

    console.log("🎉 Tutte le tabelle create con successo!");

  } catch (err) {
    console.error("❌ Errore:", err);
  } finally {
    await client.end();
    console.log("🔒 Connessione chiusa");
  }
}

createTables();
