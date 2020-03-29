const { db, User, Document } = require("../data");

// Populate db with some dummy data

async function initializeDB() {
    db.sync({ force: true })

    await new User({ firstName: "John", lastName: "Doe", email: "email@email.com", googleId: 123 }).save()
    await new Document({ title: "test", content: "lorem ipsum", ownerId: 1234 });

}

module.exports = initializeDB;