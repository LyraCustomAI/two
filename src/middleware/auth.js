import { verifyToken } from "../utils/tokens.js";

export function authRequired(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "Missing token" });

    const token = header.replace("Bearer ", "");

    try {
        const user = verifyToken(token);
        req.user = user;
        next();
    } catch (e) {
        return res.status(401).json({ error: "Invalid token" });
    }
}
