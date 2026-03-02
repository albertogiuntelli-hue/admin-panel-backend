import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "./models/Admin.js";

dotenv.config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connesso");

        const email = "info@plusmarket.it";
        const password = "PLUSM1502?";
        const name = "Admin PlusMarket";

        const exists = await Admin.findOne({ email });
        if (exists) {
            console.log("Admin già esistente:", email);
            process.exit(0);
        }

        const hashed = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            name,
            email,
            password: hashed
        });

        console.log("Admin creato con successo:");
        console.log("Email:", email);
        console.log("Password:", password);

        process.exit(0);
    } catch (error) {
        console.error("Errore nella creazione admin:", error.message);
        process.exit(1);
    }
};

run();
