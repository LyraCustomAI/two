import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "twoapi",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "two",
  waitForConnections: true,
  connectionLimit: 10,
});

export async function testConnection() {
  const conn = await pool.getConnection();
  await conn.query("SELECT 1");
  conn.release();
}
