import express from "express";
import { pool } from "../db/pool.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.post("/:photoId", authRequired, async (req, res) => {
    const { value } = req.body;
    const pid = req.params.photoId;

    await pool.query(
        "INSERT INTO photo_votes(photo_id, user_id, value) VALUES(?,?,?)",
        [pid, req.user.id, value]
    );

    res.json({ ok: true });
});

export default router;
