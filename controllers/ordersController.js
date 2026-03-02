import fs from "fs";
import path from "path";

const ordersFile = "C:/Users/alber/OneDrive/PlusMarket App 2026/orders.json";

// CREA ORDINE
export const createOrder = (req, res) => {
    const orders = fs.existsSync(ordersFile)
        ? JSON.parse(fs.readFileSync(ordersFile, "utf-8"))
        : [];

    const newOrder = {
        id: Date.now().toString(),
        ...req.body,
        status: "pending",
        createdAt: new Date().toISOString()
    };

    orders.push(newOrder);

    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
    res.json({ message: "Ordine creato", order: newOrder });
};

// LEGGI ORDINI
export const getOrders = (req, res) => {
    if (!fs.existsSync(ordersFile)) return res.json([]);
    const data = JSON.parse(fs.readFileSync(ordersFile, "utf-8"));
    res.json(data);
};

// AGGIORNA STATO ORDINE
export const updateOrderStatus = (req, res) => {
    const orders = JSON.parse(fs.readFileSync(ordersFile, "utf-8"));
    const index = orders.findIndex(o => o.id === req.params.id);

    if (index === -1) return res.status(404).json({ error: "Ordine non trovato" });

    orders[index].status = req.body.status;

    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
    res.json({ message: "Stato ordine aggiornato" });
};
