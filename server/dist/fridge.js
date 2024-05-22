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
    app.post("/api/fridge/:userId", bodyParser.json(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let errList = [];
            console.log(req.body);
            const input = req.body.skladniki;
            for (let i = 0; i < input.length; i++) {
                let valid = yield pool.query(`SELECT * FROM skladnik_w_lodowce WHERE id_skladnik = ${input[i].id_skladnik} and id_uzytkownika = ${req.params.userId}`);
                console.log(valid);
                if (valid.rowCount === 0) {
                    yield pool.query(`INSERT INTO skladnik_w_lodowce VALUES (${input[i].id_skladnik}, ${req.params.userId}, ${input[i].ilosc})`);
                }
                else {
                    errList.push(input[i].id_skladnik);
                }
            }
            console.log(`Successfully added ingredients to user ${req.params.userId}'s fridge. Ingredients already in fridge (not added): ${errList}`);
            res.status(200).json({ response: `Ingredients added successfully! Not added: ${errList}` });
        }
        catch (err) {
            console.error("Adding ingredients failed", err);
            res.status(500).json({ error: "Adding ingredients failed" });
        }
    }));
    app.get("/api/fridge/:userId", bodyParser.json(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const result = yield pool.query(`SELECT * FROM skladnik_w_lodowce WHERE id_uzytkownika = ${req.params.userId}`);
            console.log(`User ${req.params.userId} GET fridge ingredients method success`);
            res.status(200).json({ response: result.rows });
        }
        catch (err) {
            console.error("Fridge GET method fail", err);
            res.status(500).json({ error: "Fridge GET method fail" });
        }
    }));
    app.delete("/api/fridge/:userId", bodyParser.json(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const result = yield pool.query(`DELETE FROM skladnik_w_lodowce WHERE id_uzytkownika = ${req.params.userId} and id_skladnik = ${req.body.id_skladnik}`);
            console.log(`User ${req.params.userId}'s DELETE from fridge success`);
            res.status(200).json({ response: "essa byku" });
        }
        catch (err) {
            console.error("Fridge DELETE method fail", err);
            res.status(500).json({ error: "Fridge DELETE method fail" });
        }
    }));
};
