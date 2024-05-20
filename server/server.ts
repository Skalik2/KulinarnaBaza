import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

const pool = require("./db");
import cors from 'cors';
const app: Express = express();

const clientPort = 3000

const corsOptions = {
        origin: `http://localhost:${clientPort}`,
        credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '50mb'}));

require('./auth')(app);
require('./fridge')(app);
require('./recipes')(app);
require('./ingredients')(app);
require('./tags')(app);


app.get("/api",(req: Request, res: Response) =>{

        res.json({"testServera": ["dziala", "nie dziala", "może dziala"]});

})

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

app.get("/api/getUsers", async (req: Request, res: Response) =>{

        try {
                const newTag = await pool.query(
                    "SELECT * FROM public.uzytkownik"
                );
                res.json(newTag.rows[0].imie);
                console.log(newTag.rows[0].imie);
        } catch (err: any) {
                console.error(err.message);
        }
})

app.get("/api/getTag/:id", async (req: Request, res: Response) =>{

        try {
                const { id } = req.params;
                const tag = await pool.query(
                        "SELECT nazwa FROM tag WHERE id = $1",
                        [id]
                );
                res.json(tag.rows[0]);
        } catch (err: any) {
                console.error(err.message);
        }
})

app.get("/api/getAllTags", async (req: Request, res: Response) =>{

        try {
                const allTags = await pool.query("SELECT nazwa FROM tag");
                res.json(allTags.rows);
        } catch (err: any) {
                console.error(err.message);
        }
})

app.get("/hello",(req: Request, res: Response) =>{

        res.send("Hello moto!");
})

const PORT = process.env.PORT;

app.listen(PORT || 5000, ()=> {console.log("server started on http://localhost:5000")})
