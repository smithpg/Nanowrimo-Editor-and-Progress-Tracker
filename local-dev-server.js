require("dotenv").config();
process.env.IS_LOCAL = true;

const express = require("express");
const app = express();
const session = require("express-session");

const apiRouter = require("./routers/api");
const {
  redirectIfUnauthenticated,
  errorOnUnauthenticated
} = require("./middleware/auth");

app.use(
  "*",
  require("cors")({ origin: "http://localhost:3001", credentials: true })
);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000, secure: false },
    resave: false,
    saveUninitialized: false
  })
);
require("./config/passport")(app); // Init passport, create auth routes, etc.

app.use("/nanowrimo/api", errorOnUnauthenticated, apiRouter);

app.use("/nanowrimo", redirectIfUnauthenticated, (req, res, next) => {
  res.redirect("http://localhost:3001");
});

app.use("*", (err, req, res, next) => {
  console.error(err);
});

app.listen(3000, err =>
  err ? console.error(err) : console.log("Listening on port 3000...")
);
