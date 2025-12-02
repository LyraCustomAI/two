import express from "express";
import pool from "../db/pool.js";
import { authRequired } from "../middleware/auth.js";
const router = express.Router();

router.post("/:profileId", authRequired, async (req, res) => {
    await pool.query(
        "INSERT INTO visitors(visitor_id, target_id) VALUES(?,?)",
        [req.user.id, req.params.profileId]
    );
    res.json({ ok: true });
});

// GET last 10
router.get("/me", authRequired, async (req, res) => {
    const [rows] = await pool.query(
        `SELECT v.*, u.display_name
         FROM visitors v
         JOIN users u ON u.id = v.visitor_id
         WHERE v.target_id=?
         ORDER BY v.id DESC
         LIMIT 10`,
        [req.user.id]
    );
    res.json(rows);
});

export default router;
