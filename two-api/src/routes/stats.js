import { Router } from "express";
import { pool } from "../db/pool.js";

const router = Router();

router.get("/", async (req, res) => {
    const [users] = await pool.query("SELECT COUNT(*) AS c FROM users");
    const [messages] = await pool.query("SELECT COUNT(*) AS c FROM messages");
    const [photos] = await pool.query("SELECT COUNT(*) AS c FROM photos");
    const [friends] = await pool.query("SELECT COUNT(*) AS c FROM friends");

    res.json({
        users: users[0].c,
        messages: messages[0].c,
        photos: photos[0].c,
        friends: friends[0].c,
    });
});

export default router;
