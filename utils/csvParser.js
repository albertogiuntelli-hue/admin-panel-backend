import fs from "fs";
import csv from "csv-parser";

export default function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv({ separator: ";" }))
            .on("data", (row) => {
                results.push({
                    nome: row.nome || row.Nome || "",
                    codice: row.codice || row.Codice || "",
                    prezzo: parseFloat((row.prezzo || row.Prezzo || "0").replace(",", ".")),
                    categoria: row.categoria || row.Categoria || "",
                    descrizione: row.descrizione || row.Descrizione || "",
                    immagine: row.immagine || row.Immagine || "",
                });
            })
            .on("end", () => resolve(results))
            .on("error", reject);
    });
}
