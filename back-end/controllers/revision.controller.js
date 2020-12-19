const revisionModel = require("../models/revision.model");
const revisionController = {};

revisionController.getAllRevisiones = async (req, res) => {
    const allRevisiones = await revisionModel.find();
    res.json(allRevisiones);
};

revisionController.createRevision = async (req, res) => {
    try {
        const revision = new revisionModel({
            idAeronave: req.body.idAeronave,
            idRevisor: req.body.idRevisor,
            fechaRevision: req.body.fechaRevision,
            pasajeros: req.body.pasajeros
        });
        let savedRevision = await revision.save();
        res.json({
            "status":"Revision guardada",
            "id": savedRevision._id
        });
    } catch (error) {
        console.log('err' + error);
        res.status(500).send(error);
    }
};

revisionController.deleteRevision = async (req, res) => {
    await revisionModel.findByIdAndRemove(req.params.id);
    res.json({
        "status":"Revision borrada"
    });
};

module.exports = revisionController;