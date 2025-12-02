import { pool } from "../db/pool.js";

/**
 * Auth middleware:
 * - tikrina X-License header
 * - užkrauna user info į req.user
 */
export async function authMiddleware(req, res, next) {
  try {
    const license = req.header("x-license");

    if (!license) {
      return res.status(401).json({ success: false, message: "Trūksta x-license" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE license = ? LIMIT 1",
      [license]
    );

    if (!rows || rows.length === 0) {
      return res.status(401).json({ success: false, message: "Vartotojas nerastas" });
    }

    req.user = rows[0];
    next();
  } catch (err) {
    console.error("authMiddleware error:", err);
    res.status(500).json({ success: false, message: "Auth klaida" });
  }
}
