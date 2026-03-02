import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero categorie" });
    }
};

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: "Errore nella creazione categoria" });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ message: "Categoria non trovata" });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Errore nell'aggiornamento categoria" });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Categoria non trovata" });
        }
        res.json({ message: "Categoria eliminata" });
    } catch (error) {
        res.status(500).json({ message: "Errore nella cancellazione categoria" });
    }
};
