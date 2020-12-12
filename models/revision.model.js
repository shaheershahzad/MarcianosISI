const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const aeronaveSchema = new Schema({
    idAeronave: {
        type: String,
        required: true,
        trim: true
    },
    idRevisor: {
        type: Number,
        required: true,
        trim: true
    },
    fechaRevision: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
});

const revisionModel = mongoose.model("Revision", revisionSchema);
module.exports = revisionModel;