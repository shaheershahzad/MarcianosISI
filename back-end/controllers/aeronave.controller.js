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

aeronaveController.getPasajeros = async (req, res) => {
    const aeronave = await aeronaveModel.findById(req.params.idAeronave);
    if(aeronave){
        res.json(aeronave.pasajeros);
    }else{
        res.status(409).send("No hay pasajeros en la aeronave");
    }
};

aeronaveController.addPasajero = async (req, res) => {
    const aeronave = await aeronaveModel.findById(req.params.idAeronave);
    if(aeronave){
        if(aeronave.pasajeros.length < aeronave.maxPasajeros){
            await aeronaveModel.findByIdAndUpdate(req.params.idAeronave, { $addToSet: { pasajeros: [req.params.idPasajero] } });
            res.json({
                "status":"Pasajero añadido"
            });
        }else{
            res.status(409).send("Aeronave llena");
        }
    }else{
        res.status(404).send("Aeronave no existe");
    }
};

aeronaveController.removePasajero = async (req, res) => {
    await aeronaveModel.findByIdAndUpdate(req.params.idAeronave, { $pull: { pasajeros: { $in: [ req.params.idPasajero ] } } });
    res.json({
        "status":"Pasajero quitado"
    });
};

module.exports = aeronaveController;