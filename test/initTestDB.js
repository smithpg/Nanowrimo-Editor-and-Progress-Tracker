const { db, User, Document } = require("../data");

// Populate db with some dummy data

async function initializeDB() {
    await db.sync({ force: true })
    await new User({ firstName: "John", lastName: "Doe", email: "email@email.com", googleId: 123 }).save()
    await new Document({ title: "test", content: "lorem ipsum", ownerId: 1234 }).save();

    return await Document.findOne({ where: { ownerId: 1234 } }).get('id')
}

module.exports = initializeDB;