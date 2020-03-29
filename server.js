require("dotenv").config();

const fs = require("fs");
const path = require("path");
const express = require("express");
const https = require("https");
const app = express();
const session = require("express-session")

const apiRouter = require("./routers/api")
const { redirectIfUnauthenticated, errorOnUnauthenticated } = require("./middleware/auth")

app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 60000, secure: true }, resave: false, saveUninitialized: false }));
require("./config/passport")(app); // Init passport, create auth routes, etc.

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/nanowrimo/api", errorOnUnauthenticated, apiRouter);

app.use("/nanowrimo", redirectIfUnauthenticated, (req, res, next) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.use("*", (err, req, res, next) => {
  console.error(err);
})

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
