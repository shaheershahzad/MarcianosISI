const express = require("express");
const app = express();
const PORT = 3000;

//Rutas
//NaveNodriza
const naveRoutes = require("./routes/nave.routes");
//Aeronave
const aeronaveRoutes = require("./routes/aeronave.routes");
//Pasajero
const pasajeroRoutes = require("./routes/pasajero.routes");
//Revisor
const revisorRoutes = require("./routes/revisor.routes");
//Revision
const revisionRoutes = require("./routes/revision.routes");

// Settings -> Configuración del servidor
const morgan = require("morgan");
const cors = require("cors");

// Middlewares -> Funciones para tratar los datos
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//Arrancar mongo
const DB = require("./config/database");
DB();

//Manejador de rutas
const router = express.Router();

app.get("/", (req, res) => res.send("Server marcianos!"));

//Usar rutas
app.use(router);
app.use('/api/nave', naveRoutes);
app.use('/api/aeronave', aeronaveRoutes);
app.use('/api/pasajero', pasajeroRoutes);
app.use('/api/revisor', revisorRoutes);
app.use('/api/revision', revisonRoutes);


app.listen(PORT, () => console.log("Server on port 3000"));