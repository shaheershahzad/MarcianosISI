const naveModel = require("../models/nave.model");
const naveController = {};

naveController.getAllNaves = async (req, res) => {
    const allNaves = await NaveModel.find();
    res.json(allNaves);
};

naveController.createNave = async (req, res) => {
    try {
        const nave = new naveModel({
            nombre: req.body.nombre
        });
        let savedNave = await nave.save();
        res.json({
            "status":"Nave guardada",
            "id": savedNave._id
        });
    } catch (error) {
        console.log('err' + error);
        res.status(500).send(error);
    }
};

aeronaveController.deleteAeronave = async (req, res) => {
    await aeronaveModel.findByIdAndRemove(req.params.id);
    res.json({
        "status":"Aeronave borrado"
    });
};

module.exports = aeronaveController;