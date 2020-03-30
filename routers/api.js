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

apiRouter.post("/document", (req, res, next) => {
    // Create new document
    const docOpts = req.body;

    Document.create(docOpts).then(createdDoc => {
        res.json(createdDoc.get)
    });
})

apiRouter
    .param("document_id", async (req, res, next, docId) => {
        try {
            req.retrievedDocument = await Document.findByPk(docId);
            next();
        } catch (error) {
            next(error)
        }
    })
    .route("/document/:document_id")
    .get(async (req, res, next) => {
        res.json(req.retrievedDocument);
    })
    .put(async (req, res, next) => {
        const update = req.body;

        // Apply update to document instance
        Object.assign(req.retrievedDocument, update);
        await req.retrievedDocument.save();

        // Respond with updated document
        res.json(req.retrievedDocument);
    })



module.exports = apiRouter;