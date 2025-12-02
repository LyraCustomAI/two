import express from "express";
import cors from "cors";

import photos from "./routes/photos.js";
import gifts from "./routes/gifts.js";
import messages from "./routes/messages.js";
import visitors from "./routes/visitors.js";
import friends from "./routes/friends.js";
import forum from "./routes/forum.js";
import votes from "./routes/votes.js";
import auth from "./routes/auth.js";
import wallet from "./routes/wallet.js";
import stats from "./routes/stats.js";
import usersRouter from "./routes/users.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/photos", photos);
app.use("/gifts", gifts);
app.use("/messages", messages);
app.use("/visitors", visitors);
app.use("/friends", friends);
app.use("/forum", forum);
app.use("/votes", votes);
app.use("/auth", auth);
app.use("/wallet", wallet);
app.use("/stats", stats);
app.use("/users", usersRouter);

export default app;
