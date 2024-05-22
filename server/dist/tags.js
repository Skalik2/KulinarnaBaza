"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const session = require("express-session");
const bodyParser = require("body-parser");
const pool = require("./db");
module.exports = function (app) {
    app.use(session({
        secret: "whatdoIwriteherepleasetellmetutorials",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }));
    app.get("/api/tags", bodyParser.json(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query("SELECT * FROM tag");
            res.status(200).json({ response: result.rows });
        }
        catch (err) {
            console.error("Tags GET failed", err);
            res.status(500).json({ error: "Tags GET failed" });
        }
    }));
    app.get("/api/tags/:tagId", bodyParser.json(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query(`SELECT * FROM tag WHERE id_tagu = ${req.params.tagId}`);
            res.status(200).json({ response: result.rows[0].nazwa });
        }
        catch (err) {
            console.error("Tags GET failed", err);
            res.status(500).json({ error: "Tags GET failed" });
        }
    }));
};
