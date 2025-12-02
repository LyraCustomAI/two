import { Router } from "express";
import { pool } from "../db/pool.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.get("/me", authRequired, async (req, res) => {
  const [rows] = await pool.query(
    "SELECT balance FROM users WHERE id=? LIMIT 1",
    [req.user.id]
  );
  res.json(rows[0]);
});

router.post("/add", authRequired, async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0)
    return res.status(400).json({ error: "invalid amount" });

  await pool.query(
    "UPDATE users SET balance = balance + ? WHERE id=?",
    [amount, req.user.id]
  );

  res.json({ ok: true });
});

router.post("/spend", authRequired, async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0)
    return res.status(400).json({ error: "invalid amount" });

  const [user] = await pool.query(
    "SELECT balance FROM users WHERE id=? LIMIT 1",
    [req.user.id]
  );

  if (!user.length)
    return res.status(404).json({ error: "user not found" });

  if (user[0].balance < amount)
    return res.status(400).json({ error: "insufficient funds" });

  await pool.query(
    "UPDATE users SET balance = balance - ? WHERE id=?",
    [amount, req.user.id]
  );

  res.json({ ok: true });
});

export default router;
