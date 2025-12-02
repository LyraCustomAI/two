import express from "express";
import cors from "cors";
import config from ".src/config.js";

import photos from ".src/routes/photos.js";
import gifts from ".src/routes/gifts.js";
import messages from ".src/routes/messages.js";
import visitors from ".src/routes/visitors.js";
import friends from ".src/routes/friends.js";
import forum from ".src/routes/forum.js";
import votes from ".src/routes/votes.js";
import auth from ".src/routes/auth.js";

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

app.listen(config.port, () => {
  console.log(`🔥 TWO.lt API online ant ${config.port}`);
});
