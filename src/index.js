import express from "express";
import cors from "cors";
import config from "./config.js";

import photos from "./routes/photos.js";
import gifts from "./routes/gifts.js";
import messages from "./routes/messages.js";
import visitors from "./routes/visitors.js";
import friends from "./routes/friends.js";
import forum from "./routes/forum.js";
import votes from "./routes/votes.js";

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

app.listen(config.port, () => {
  console.log(`🔥 TWO.lt API online ant ${config.port}`);
});
