export default function (req, res, next) {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: "Accesso riservato agli admin." });
    }
    next();
}
