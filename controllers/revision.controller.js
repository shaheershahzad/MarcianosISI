const revisionModel = require("../models/revision.model");
const revisionController = {};

revisionController.getAllRevisions = async (req, res) => {
    const allRevisions = await revisionModel.find();
    res.json(allRevisions);
};

revisionController.createRevision = async (req, res) => {
    try {
        const revision = new revisionModel({
            idAeronave: req.body.idAeronave,
            idRevisor: req.body.idRevisor,
            fechaRevision: req.body.fechaRevision
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