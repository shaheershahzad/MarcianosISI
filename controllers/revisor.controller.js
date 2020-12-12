const revisorModel = require("../models/revisor.model");
const revisorController = {};

revisorController.getAllRevisores = async (req, res) => {
    const allRevisors = await revisorModel.find();
    res.json(allRevisors);
};

revisorController.createRevisor = async (req, res) => {
    try {
        const revisor = new revisorModel({
            nombre: req.body.nombre
        });
        let savedRevisor = await revisor.save();
        res.json({
            "status":"Revisor guardado",
            "id": savedRevisor._id
        });
    } catch (error) {
        console.log('err' + error);
        res.status(500).send(error);
    }
};

revisorController.deleteRevisor = async (req, res) => {
    await revisorModel.findByIdAndRemove(req.params.id);
    res.json({
        "status":"Revisor borrado"
    });
};

module.exports = revisorController;