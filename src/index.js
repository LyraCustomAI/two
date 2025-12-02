import express from "express";
import cors from "cors";
import { pool } from "./db/pool.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    await conn.query("SELECT 1");
    conn.release();
    res.json({ api: true, db: true });
  } catch (err) {
    res.json({ api: true, db: false });
  }
});

app.listen(3000, () => console.log("🔥 TWO API startavo ant 3000 porto"));

