import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./db/pool.js";
import { authRouter } from "./routes/auth.js";
import { usersRouter } from "./routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health-check API + DB
app.get("/health", async (req, res) => {
  try {
    await testConnection();
    res.json({ api: true, db: true });
  } catch (err) {
    console.error("Health error:", err);
    res.status(500).json({ api: true, db: false });
  }
});

// Routes
app.use("/auth", authRouter);
app.use("/", usersRouter); // /me, /users/:id, /me PATCH

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Nerastas endpointas" });
});

// Start
app.listen(PORT, () => {
  console.log(`TWO.lt API startuotas ant ${PORT} porto ✨`);
});
