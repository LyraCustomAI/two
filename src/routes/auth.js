import express from "express";
import { pool } from "../db/pool.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { generateToken } from "../utils/tokens.js";
import { clean } from "../utils/sanitizer.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

/**
 * POST /auth/register
 * {
 *  license: "...",
 *  display_name: "Mindux",
 *  password: "abc123",
 *  gender: "m",
 *  age: 18,
 *  city: "Vilnius"
 * }
 */
router.post("/register", async (req, res) => {
    const { license, display_name, password, gender, age, city } = req.body;

    if (!license || !password || !display_name) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const passHash = await hashPassword(password);

    const [insert] = await pool.query(`
        INSERT INTO users(license, display_name, gender, age, city, password)
        VALUES (?,?,?,?,?,?)
    `, [
        clean(license),
        clean(display_name),
        gender || null,
        age || null,
        clean(city || ""),
        passHash
    ]);

    res.json({ id: insert.insertId, ok: true });
});


/**
 * POST /auth/login
 * { license: "", password: "" }
 */
router.post("/login", async (req, res) => {
    const { license, password } = req.body;

    const [rows] = await pool.query(`
        SELECT * FROM users WHERE license = ?
    `, [clean(license)]);

    if (!rows.length) return res.status(404).json({ error: "User not found" });

    const user = rows[0];
    const ok = await verifyPassword(password, user.password);

    if (!ok) return res.status(401).json({ error: "Wrong password" });

    const token = generateToken(user);

    res.json({
        token,
        id: user.id,
        name: user.display_name
    });
});

/**
 * GET /auth/me
 */
router.get("/me", authRequired, async (req, res) => {
    const [rows] = await pool.query(
        "SELECT id, display_name, age, city, gender, avatar, banner, balance FROM users WHERE id=?",
        [req.user.id]
    );
    res.json(rows[0]);
});

export default router;
