import express from "express";
import { pool } from "../db/pool.js";
import { authMiddleware } from "../middleware/auth.js";

export const usersRouter = express.Router();

/**
 * GET /me
 * Prisijungusio user info pagal JWT
 */
usersRouter.get("/me", authMiddleware, async (req, res) => {
  try {
    const u = req.user;

    const [rows] = await pool.query(
      `SELECT id, license, display_name, gender, age, city, bio, avatar, banner, balance,
              created_at, last_login
       FROM users WHERE id = ? LIMIT 1`,
      [u.id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user: rows[0] });

  } catch (err) {
    console.error("GET /me error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


/**
 * GET /users/latest?limit=12
 * Naujausi registruoti nariai — HOME puslapiui
 */
usersRouter.get("/latest", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || 12);

    const [rows] = await pool.query(
      `SELECT id, display_name, age, city, gender, avatar
       FROM users
       ORDER BY id DESC
       LIMIT ?`,
      [limit]
    );

    res.json({ success: true, users: rows });
  } catch (err) {
    console.error("GET /users/latest error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


/**
 * GET /users/:id
 * Viešas profilio API
 */
usersRouter.get("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ success: false, message: "Blogas ID" });
    }

    const [rows] = await pool.query(
      `SELECT id, display_name, gender, age, city, bio, avatar, banner, created_at, last_login
       FROM users WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!rows.length) {
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
 * Profilio redagavimas
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
      `SELECT id, display_name, gender, age, city, bio, avatar, banner, created_at, last_login, balance
       FROM users WHERE id = ? LIMIT 1`,
      [u.id]
    );

    res.json({ success: true, user: rows[0] });

  } catch (err) {
    console.error("PATCH /me error:", err);
    res.status(500).json({ success: false, message: "Serverio klaida" });
  }
});

export default usersRouter;
