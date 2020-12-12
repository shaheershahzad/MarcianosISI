const express = require("express");
const router = express.Router();

const revisionController = require("../controllers/revision.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", revisionController.getRevision);
    router.post("/", revisionController.createRevision);
    router.delete("/:id", revisionController.deleteRevision);
//};
module.exports = router;