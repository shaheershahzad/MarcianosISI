const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const pasajeroSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
});

const pasajeroModel = mongoose.model("Pasajero", pasajeroSchema);
module.exports = pasajeroModel;