import express from "express";
import { pool } from "../db/pool.js";
import { authRequired } from "../middleware/auth.js";
import { clean } from "../utils/sanitizer.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
    const [rows] = await pool.query(
        "SELECT * FROM forum_posts WHERE target_id=? ORDER BY id DESC",
        [req.params.userId]
    );
    res.json(rows);
});

router.post("/:userId", authRequired, async (req, res) => {
    await pool.query(
        "INSERT INTO forum_posts(author_id,target_id,text) VALUES(?,?,?)",
        [req.user.id, req.params.userId, clean(req.body.text)]
    );
    res.json({ ok: true });
});

export default router;
