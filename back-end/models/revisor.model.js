const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const revisorSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
});

const revisorModel = mongoose.model("Revisor", revisorSchema);
module.exports = revisorModel;