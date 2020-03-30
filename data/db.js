const Sequelize = require("sequelize");

const STORAGE_LOCATION = process.env.NODE_ENV === 'test' ? ':memory:' : './data/nanowrimo.db'

const db = new Sequelize({
    dialect: "sqlite",
    storage: STORAGE_LOCATION,
    logging: false
});

module.exports = db;