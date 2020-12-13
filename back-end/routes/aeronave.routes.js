const express = require("express");
const router = express.Router();

const aeronaveController = require("../controllers/aeronave.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", aeronaveController.getAllAeronaves);
    router.post("/", aeronaveController.createAeronave);
    router.delete("/:id", aeronaveController.deleteAeronave);
    router.get("/:idAeronave/pasajeros", aeronaveController.getPasajeros);
    router.put("/:idAeronave/pasajero/add/:idPasajero", aeronaveController.addPasajero);
    router.put("/:idAeronave/pasajero/remove/:idPasajero", aeronaveController.removePasajero);
//};
module.exports = router;