import express from "express";
import { pool } from "../db/pool.js";

export const authRouter = express.Router();

/**
 * POST /auth/fivem-login
 * Body:
 * {
 *   "license": "steam:1100001123123",
 *   "displayName": "Mindux",
 *   "gender": "m", // optional
 *   "city": "Vilnius", // optional
 *   "age": 19 // optional
 * }
 */
authRouter.post("/fivem-login", async (req, res) => {
  try {
    const { license, displayName, gender, city, age } = req.body;

    if (!license || !displayName) {
      return res.status(400).json({
        success: false,
        message: "Reikalingi laukai: license, displayName",
      });
    }

    // Ar jau yra toks useris?
    const [existing] = await pool.query(
      "SELECT * FROM users WHERE license = ? LIMIT 1",
      [license]
    );

    let user;

    if (existing.length === 0) {
      // Sukuriam naują vartotoją
      const [result] = await pool.query(
        `INSERT INTO users (license, display_name, gender, age, city, created_at, last_login)
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          license,
          displayName,
          gender || null,
          age || null,
          city || null,
        ]
      );

      const [rows] = await pool.query(
        "SELECT * FROM users WHERE id = ? LIMIT 1",
        [result.insertId]
      );
      user = rows[0];
    } else {
      // Atnaujinam last_login, display_name (jei pasikeitė)
      await pool.query(
        `UPDATE users 
         SET display_name = ?, last_login = NOW() 
         WHERE id = ?`,
        [displayName, existing[0].id]
      );

      const [rows] = await pool.query(
        "SELECT * FROM users WHERE id = ? LIMIT 1",
        [existing[0].id]
      );
      user = rows[0];
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        license: user.license,
        displayName: user.display_name,
        gender: user.gender,
        age: user.age,
        city: user.city,
        balance: user.balance,
        created_at: user.created_at,
        last_login: user.last_login,
      },
    });
  } catch (err) {
    console.error("POST /auth/fivem-login error:", err);
    res.status(500).json({ success: false, message: "Serverio klaida" });
  }
});
