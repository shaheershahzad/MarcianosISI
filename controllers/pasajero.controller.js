const pasajeroModel = require("../models/pasajero.model");
const pasajeroController = {};

pasajeroController.getAllPasajeros = async (req, res) => {
    const allPasajeros = await pasajeroModel.find();
    res.json(allPasajeros);
};

pasajeroController.createPasajero = async (req, res) => {
    try {
        const pasajero = new pasajeroModel({
            nombre: req.body.nombre
        });
        let savedPasajero = await pasajero.save();
        res.json({
            "status":"Pasajero guardado",
            "id": savedPasajero._id
        });
    } catch (error) {
        console.log('err' + error);
        res.status(500).send(error);
    }
};

pasajeroController.deletePasajero = async (req, res) => {
    await pasajeroModel.findByIdAndRemove(req.params.id);
    res.json({
        "status":"Pasajero borrado"
    });
};

module.exports = pasajeroController;