const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/nanowrimo", (req, res, next) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
