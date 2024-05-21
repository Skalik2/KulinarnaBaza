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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const pool = require("./db");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const clientPort = 3000;
const corsOptions = {
    origin: `http://localhost:${clientPort}`,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json({ limit: '50mb' }));
require('./auth')(app);
require('./comments')(app);
require('./fridge')(app);
require('./recipes')(app);
require('./articles')(app);
app.get("/api", (req, res) => {
    res.json({ "testServera": ["dziala", "nie dziala", "może dziala"] });
});
/*app.post("/api/insertTag", async (req: Request, res: Response) =>{

        try {
                const { tagName } = req.body;
                const newTag = await pool.query(
                        "INSERT INTO tag (nazwa) VALUES($1)",
                        [tagName]
                );
                res.json(newTag);
                console.log(tagName);
        } catch (err: any) {
                console.error(err.message);
        }
})*/
app.get("/api/getUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTag = yield pool.query("SELECT * FROM public.uzytkownik");
        res.json(newTag.rows[0].imie);
        console.log(newTag.rows[0].imie);
    }
    catch (err) {
        console.error(err.message);
    }
}));
app.get("/api/getTag/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tag = yield pool.query("SELECT nazwa FROM tag WHERE id = $1", [id]);
        res.json(tag.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
}));
app.get("/api/getAllTags", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTags = yield pool.query("SELECT nazwa FROM tag");
        res.json(allTags.rows);
    }
    catch (err) {
        console.error(err.message);
    }
}));
app.get("/hello", (req, res) => {
    res.send("Hello moto!");
});
const PORT = process.env.PORT;
app.listen(PORT || 5000, () => { console.log("server started on http://localhost:5000"); });
