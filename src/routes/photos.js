import express from "express";
import { pool } from "../db/pool.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

// GET /photos/user/:id
router.get("/user/:id", async (req, res) => {
    const [rows] = await pool.query(
        "SELECT * FROM photos WHERE owner_id = ? ORDER BY id DESC",
        [req.params.id]
    );
    res.json(rows);
});

// POST /photos
router.post("/", authRequired, async (req, res) => {
    const { url, desc } = req.body;
    if (!url) return res.status(400).json({ error: "missing image" });

    await pool.query(
        "INSERT INTO photos(owner_id, url, description) VALUES(?,?,?)",
        [req.user.id, url, desc || ""]
    );

    res.json({ ok: true });
});

export default router;

