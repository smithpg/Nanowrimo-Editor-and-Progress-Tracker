const db = require("./db");
db.sync();

module.exports = {
    User: require("./user"),
    Document: require("./document"),
    db
}

