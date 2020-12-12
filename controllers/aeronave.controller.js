const aeronaveModel = require("../models/aeronave.model");
const aeronaveController = {};

aeronaveController.getAllAeronaves = async (req, res) => {
    const allAeronaves = await aeronaveModel.find();
    res.json(allAeronaves);
};

aeronaveController.createAeronave = async (req, res) => {
    try {
        const aeronave = new aeronaveModel({
            nombre: req.body.nombre,
            maxPasajeros: req.body.maxPasajeros,
            origen: req.body.origen,
            destino: req.body.destino
        });
        let savedAeronave = await aeronave.save();
        res.json({
            "status":"Aeronave guardada",
            "id": savedAeronave._id
        });
    } catch (error) {
        console.log('err' + error);
        res.status(500).send(error);
    }
};

aeronaveController.deleteAeronave = async (req, res) => {
    await aeronaveModel.findByIdAndRemove(req.params.id);
    res.json({
        "status":"Aeronave borrada"
    });
};

module.exports = aeronaveController;