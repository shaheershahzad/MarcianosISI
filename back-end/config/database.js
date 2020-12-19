const mongoose = require("mongoose");
//const URI = "mongodb://localhost/marcianos";
const URI = "mongodb://root:example@localhost:27018/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";

module.exports = () => {
    mongoose.connect(URI, { useNewUrlParser: true, useFindAndModify: false })
    .then(db => console.log(`DB is connected ${URI}`))
    .catch(err => console.log(err));

    process.on("SIGINT", () => {
        mongoose.connection.close( () => {
            console.log("Mongo is disconnected");
            process.exit(0);
        });
    });
}