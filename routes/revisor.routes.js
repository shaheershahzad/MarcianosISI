const express = require("express");
const router = express.Router();

const revisorController = require("../controllers/revisor.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", revisorController.getRevisores);
    router.post("/", revisorController.createRevisor);
    router.delete("/:id", revisorController.deleteRevisor);
//};
module.exports = router;