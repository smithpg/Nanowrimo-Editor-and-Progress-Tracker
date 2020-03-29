const { Router } = require("express");
const { User, Document } = require("../data")

// Create api router that handles login routes, plus document 
// retrieval

const apiRouter = new Router();

apiRouter.get("/user", async (req, res, next) => {
    // Respond with user info and list of documents
    const documents = await Document.findAll({ where: { ownerId: req.user.googleId } });

    const userInfo = {
        ...req.user,
        documents
    }

    res.send(userInfo);
})

apiRouter.route("/document/:document_id")
    .get(async (req, res, next) => {
        try {
            const foundDocument = await Document.findByPk(document_id);
            res.send(foundDocument);
        } catch (error) {
            next(error);
        }
    })
    .put(async (req, res, next) => {


        const update = req.body;


        try {
            const foundDocument = await Document.findByPk(document_id);

            foundDocument.update(update)

            res.send(foundDocument);
        } catch (error) {
            next(error);
        }

    })



module.exports = apiRouter;