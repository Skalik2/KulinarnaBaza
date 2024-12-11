const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors ({ origin: "http://localhost:5233"}))
const port = 3001;

app.get("/",(req,res) => {
    res.send("Test api !");
});

app.listen(port);