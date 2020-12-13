const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const naveSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
});

const naveModel = mongoose.model("Nave", naveSchema);
module.exports = naveModel;