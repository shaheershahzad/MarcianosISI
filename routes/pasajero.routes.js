const express = require("express");
const router = express.Router();

const pasajeroController = require("../controllers/pasajero.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", pasajeroController.getPasajeros);
    router.post("/", pasajeroController.createPasajero);
    router.delete("/:id", pasajeroController.deletePasajero);
//};
module.exports = router;