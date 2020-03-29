const request = require("supertest")
const express = require("express");

const initializeDb = require("../initTestDB")

// Require router under test
const apiRouter = require("../../routers/api")

// Create app
const app = express();

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
    beforeEach(initializeDb)

    it("should respond to requests", function () {

        return request(app)
            .get("/user")
            .expect("Content-Type", /json/)
            .expect(200)
    })
})























