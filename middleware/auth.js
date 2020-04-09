const createError = require("http-errors");

module.exports = {
  redirectIfUnauthenticated: (req, res, next) => {
    // If the user is not logged in, redirect
    if (!req.user) {
      res.redirect("/nanowrimo/auth/login");
    } else {
      // Otherwise, continue to next middleware
      next();
    }
  },

  errorOnUnauthenticated: (req, res, next) => {
    // If the user is not logged in, redirect
    if (!req.user) {
      next(createError(401));
    } else {
      // Otherwise, continue to next middleware
      next();
    }
  }
};
