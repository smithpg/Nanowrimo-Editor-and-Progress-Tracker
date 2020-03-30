const request = require("supertest")
const express = require("express");

const initializeDb = require("../initTestDB")

// Require router under test
const apiRouter = require("../../routers/api")

// Create app
const app = express();
app.use(express.json())

// Mock req.user 
app.use((req, res, next) => {
    req.user = {
        firstName: "John",
        lastName: "Doe",
        email: "email@email.com",
        googleId: 1234
    }

    next();
})

app.use(apiRouter);


describe("API router", () => {
    let documentId;
    beforeEach(async () => {
        documentId = await initializeDb();
    })

    describe("`/user/` route", () => {
        it("should respond to GET requests", function () {

            return request(app)
                .get("/user")
                .expect("Content-Type", /json/)
                .expect(200)
        })
    })

    describe("`/documents/:document_id` route", () => {
        it("should respond to GET requests with JSON", function () {

            return request(app)
                .get("/document/" + documentId)
                .expect("Content-Type", /json/)
                .expect(200)
        })
        it("should respond to PUT requests with JSON", () => {
            return request(app)
                .put("/document/" + documentId)
                .send({ title: "Stuff", content: "things" })
                .set('Accept', 'application/json')
                .expect("Content-Type", /json/)
                .expect(200)
                .then(res => console.log(res.body))
        })
    })
})
