const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const aeronaveSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    maxPasajeros: {
        type: Number,
        required: true,
        trim: true
    },
    origen: {
        type: String,
        required: true,
        trim: true
    },
    destino: {
        type: String,
        required: true,
        trim: true
    },
    pasajeros: [
        {
            type: String,
            trim: true
        } 
    ] 
},
{
    timestamps: true
});

const aeronaveModel = mongoose.model("Aeronave", aeronaveSchema);
module.exports = aeronaveModel;