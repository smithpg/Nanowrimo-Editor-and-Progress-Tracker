const Sequelize = require("sequelize");

const STORAGE_LOCATION = process.env.NODE_ENV === 'test' ? './test.db' : './data/nanowrimo.db'

const db = new Sequelize({
    dialect: "sqlite",
    storage: STORAGE_LOCATION
});

module.exports = db;