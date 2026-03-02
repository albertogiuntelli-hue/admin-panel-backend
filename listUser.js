// backend/listUser.js

import mongoose from "mongoose";
import User from "./models/User.js";

// Connessione allo stesso database usato dal server
mongoose.connect("mongodb://127.0.0.1:27017/plusmarket");

async function listUsers() {
  try {
    const users = await User.find({});
    console.log("Utenti trovati nel database plusmarket:");
    console.log(users);
  } catch (err) {
    console.error("Errore:", err);
  } finally {
    mongoose.connection.close();
  }
}

listUsers();
