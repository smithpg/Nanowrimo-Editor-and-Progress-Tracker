require("dotenv").config();

const path = require("path");
const express = require("express");
const https = require("https");
const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/nanowrimo", (req, res, next) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

https
  .createServer(
    {
      key: fs.readFileSync(process.env.CERT_KEY),
      cert: fs.readFileSync(process.env.CERT)
    },
    app
  )
  .listen(443, err =>
    err ? console.error(err) : console.log("Listening on port 443...")
  );
