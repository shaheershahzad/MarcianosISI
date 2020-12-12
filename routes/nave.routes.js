const express = require("express");
const router = express.Router();

const naveController = require("../controllers/nave.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", naveController.getAllNaves);
    router.post("/", naveController.createNave);
    router.delete("/:id", naveController.deleteNave);
//};
module.exports = router;