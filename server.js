import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { pool } from './config/db.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Rotta corretta per i prodotti
app.use('/api/prodotti', productRoutes);

// Porta corretta per Railway
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);
});
