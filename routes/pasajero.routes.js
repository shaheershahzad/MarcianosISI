const express = require("express");
const router = express.Router();

const pasajeroController = require("../controllers/pasajero.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", pasajeroController.getAllPasajeros);
    router.post("/", pasajeroController.createPasajero);
    router.delete("/:id", pasajeroController.deletePasajero);
//};
module.exports = router;