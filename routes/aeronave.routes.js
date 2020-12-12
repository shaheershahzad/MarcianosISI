const express = require("express");
const router = express.Router();

const aeronaveController = require("../controllers/aeronave.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", aeronaveController.getAeronaves);
    router.post("/", aeronaveController.createAeronave);
    router.delete("/:id", aeronaveController.deleteAeronave);
//};
module.exports = router;