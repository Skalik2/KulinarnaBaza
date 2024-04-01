"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/api", (req, res) => {
    res.json({ "testServera": ["dziala", "nie dziala", "może dziala"] });
});
app.get("/hello", (req, res) => {
    res.send("Hello moto!");
});
const PORT = process.env.PORT;
app.listen(PORT || 5000, () => { console.log("server started on http://localhost:5000"); });
