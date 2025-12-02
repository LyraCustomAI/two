import express from "express";
import pool from "../db/pool.js";
import { authRequired } from "../middleware/auth.js";
import { clean } from "../utils/sanitizer.js";
const router = express.Router();

// GET /messages/:userId
router.get("/:uid", authRequired, async (req, res) => {
    const [msgs] = await pool.query(
        "SELECT * FROM messages WHERE (from_user_id=? AND to_user_id=?) OR (from_user_id=? AND to_user_id=?) ORDER BY id DESC",
        [req.user.id, req.params.uid, req.params.uid, req.user.id]
    );
    res.json(msgs);
});

// POST /messages/send
router.post("/send", authRequired, async (req, res) => {
    const { to, text } = req.body;
    if (!to || !text) return res.status(400).json({ error: "missing fields" });

    await pool.query(
        "INSERT INTO messages(from_user_id, to_user_id, text) VALUES(?,?,?)",
        [req.user.id, to, clean(text)]
    );

    res.json({ sent: true });
});

export default router;
