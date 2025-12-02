import express from "express";
import { pool } from "../db/pool.js";
import { authMiddleware } from "../middleware/auth.js";

export const usersRouter = express.Router();

/**
 * GET /me
 * Pagal x-license (authMiddleware) grąžina prisijungusio user info
 */
usersRouter.get("/me", authMiddleware, async (req, res) => {
  const u = req.user;

  res.json({
    success: true,
    user: {
      id: u.id,
      license: u.license,
      displayName: u.display_name,
      gender: u.gender,
      age: u.age,
      city: u.city,
      bio: u.bio,
      balance: u.balance,
      created_at: u.created_at,
      last_login: u.last_login,
    },
  });
});

/**
 * GET /users/:id
 * Viešas profilio API (ką rodys one.lt UI)
 */
usersRouter.get("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id) || 0;
    if (!id) {
      return res.status(400).json({ success: false, message: "Blogas ID" });
    }

    const [rows] = await pool.query(
      "SELECT id, display_name, gender, age, city, bio, avatar, banner, created_at, last_login FROM users WHERE id = ? LIMIT 1",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Vartotojas nerastas" });
    }

    res.json({ success: true, user: rows[0] });
  } catch (err) {
    console.error("GET /users/:id error:", err);
    res.status(500).json({ success: false, message: "Serverio klaida" });
  }
});

/**
 * PATCH /me
 * Atnaujinti savo profilį (bio, city, age, gender, avatar, banner)
 */
usersRouter.patch("/me", authMiddleware, async (req, res) => {
  try {
    const u = req.user;
    const { bio, city, age, gender, avatar, banner } = req.body;

    await pool.query(
      `UPDATE users SET 
        bio = COALESCE(?, bio),
        city = COALESCE(?, city),
        age = COALESCE(?, age),
        gender = COALESCE(?, gender),
        avatar = COALESCE(?, avatar),
        banner = COALESCE(?, banner)
       WHERE id = ?`,
      [bio, city, age, gender, avatar, banner, u.id]
    );

    const [rows] = await pool.query(
      "SELECT id, display_name, gender, age, city, bio, avatar, banner, created_at, last_login, balance FROM users WHERE id = ? LIMIT 1",
      [u.id]
    );

    res.json({ success: true, user: rows[0] });
  } catch (err) {
    console.error("PATCH /me error:", err);
    res.status(500).json({ success: false, message: "Serverio klaida" });
  }
});
