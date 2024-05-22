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
const fs = require("fs");
const path = require("path");
module.exports = function (app) {
    app.use(session({
        secret: "whatdoIwriteherepleasetellmetutorials",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }));
    app.get("/api/articles/image/:articleId", (req, res) => {
        res.sendFile(path.join(__dirname, `../images/article_${req.params.articleId}_thumbnail.png`));
    });
    app.post("/api/articles/:userId", bodyParser.json(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let id = yield pool.query(`SELECT max(id_artykulu) FROM artykul`);
            id = id.rows[0].max;
            if (id == null) {
                id = 1;
            }
            console.log(id);
            const filename = `images/article_${id}_thumbnail.png`;
            let base64Data = req.body.zdjecie.replace(/^data:image\/jpeg;base64,/, "");
            base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
            //console.log(base64Data);
            fs.writeFile(filename, base64Data, "base64", function (err) {
                if (err) {
                    throw new Error("Image could not be saved");
                }
                else {
                    console.log(`Image ${filename} saved successfully`);
                }
            });
            yield pool.query("INSERT INTO artykul VALUES ($1,$2,$3,$4,$5,NOW()::DATE)", [
                id,
                req.body.tytul,
                req.body.opis,
                filename,
                req.params.userId
            ]);
            console.log(`Successfully added article by user: ${req.params.userId}`);
            res.status(200).json({ response: `Article added successfully!` });
        }
        catch (err) {
            console.error("Adding article failed", err);
            res.status(500).json({ error: "Adding article failed" });
        }
    }));
    app.get("/api/articles", bodyParser.json(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query("SELECT * FROM artykul");
            res.status(200).json({ response: result.rows });
        }
        catch (err) {
            console.error("Getting articles failed", err);
            res.status(500).json({ error: "Getting articles failed" });
        }
    }));
};
