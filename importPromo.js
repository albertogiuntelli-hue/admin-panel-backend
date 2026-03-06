const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function importCSV() {
    const results = [];
    const filePath = path.join(__dirname, 'data', 'promo5.csv');

    fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => {
            results.push({
                codice: data.codice,
                nome: data.nome,
                descrizione: data.descrizione,
                prezzo: parseFloat(data.prezzo || 0),
                prezzoScontato: data.prezzoScontato ? parseFloat(data.prezzoScontato) : null,
                categoria: data.categoria,
                disponibile: data.disponibile === '1'
            });
        })
        .on('end', async () => {
            console.log(`Prodotti letti: ${results.length}`);

            for (const p of results) {
                try {
                    await pool.query(
                        `INSERT INTO products (codice, nome, descrizione, prezzo, prezzo_scontato, categoria, disponibile)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                        [
                            p.codice,
                            p.nome,
                            p.descrizione,
                            p.prezzo,
                            p.prezzoScontato,
                            p.categoria,
                            p.disponibile
                        ]
                    );
                } catch (err) {
                    console.error('Errore inserimento:', err.message);
                }
            }

            console.log('Importazione completata.');
            pool.end();
        });
}

importCSV();
