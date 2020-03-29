const db = require("./db");
const User = require("./user")
const Sequelize = require("sequelize")

const Document = db.define('document', {
    // attributes
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        referenes: {
            model: User,
            key: 'id',

        }
    },
}, {});

module.exports = Document;