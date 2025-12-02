import express from "express";
import { pool } from "../db/pool.js";
import { authRequired } from "../middleware/auth.js";
const router = express.Router();

router.post("/request", authRequired, async (req, res) => {
    const { toUserId } = req.body;
    await pool.query(
        "INSERT INTO friends(user_id, friend_id, status) VALUES(?,?,?)",
        [req.user.id, toUserId, "pending"]
    );
    res.json({ ok: true });
});

router.post("/accept", authRequired, async (req, res) => {
    const { fromUserId } = req.body;
    await pool.query(
        "UPDATE friends SET status='accepted' WHERE user_id=? AND friend_id=?",
        [fromUserId, req.user.id]
    );
    res.json({ ok: true });
});

router.get("/list", authRequired, async (req, res) => {
    const [rows] = await pool.query(
        "SELECT friend_id FROM friends WHERE user_id=? AND status='accepted'",
        [req.user.id]
    );
    res.json(rows);
});

export default router;
