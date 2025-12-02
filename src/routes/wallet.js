import { Router } from "express";
import db from "../db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/me", authMiddleware, async (req, res) => {
  const [rows] = await db.query(
    "SELECT balance FROM users WHERE id = ? LIMIT 1",
    [req.user.id]
  );
  res.json(rows[0]);
});

router.post("/add", authMiddleware, async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) return res.status(400).json({ error: "invalid amount" });

  await db.query(
    "UPDATE users SET balance = balance + ? WHERE id = ?",
    [amount, req.user.id]
  );
  res.json({ ok: true });
});

router.post("/spend", authMiddleware, async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) return res.status(400).json({ error: "invalid amount" });

  const [user] = await db.query(
    "SELECT balance FROM users WHERE id = ?",
    [req.user.id]
  );

  if (user[0].balance < amount)
    return res.status(400).json({ error: "insufficient funds" });

  await db.query(
    "UPDATE users SET balance = balance - ? WHERE id = ?",
    [amount, req.user.id]
  );
  res.json({ ok: true });
});

export default router;
