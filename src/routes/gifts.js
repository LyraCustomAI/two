import express from "express";
import pool from "../db/pool.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.post("/send", authRequired, async (req, res) => {
    const { toUserId, giftId, emoji } = req.body;

    await pool.query(
        "INSERT INTO gifts(from_user_id, to_user_id, gift_type, emoji) VALUES (?,?,?,?)",
        [req.user.id, toUserId, giftId, emoji]
    );

    res.json({ ok: true });
});

router.get("/last", async (req, res) => {
    const [rows] = await pool.query(
        `SELECT g.*, u.display_name 
         FROM gifts g 
         JOIN users u ON u.id = g.from_user_id 
         ORDER BY id DESC LIMIT 10`
    );
    res.json(rows);
});

export default router;
