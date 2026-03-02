import mongoose from "mongoose";
import User from "./models/User.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/plusmarket";

try {
    await mongoose.connect(MONGO_URI);
    console.log("Connesso al DB");

    const email = "info@plusmarket.it";

    const result = await User.deleteOne({ email });

    console.log("Risultato eliminazione:", result);

    await mongoose.connection.close();
    console.log("Connessione chiusa");
} catch (err) {
    console.error("Errore:", err);
}
