const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.send("Server marcianos!"));

app.listen(PORT, () => console.log("Server online"));