import express, { Express, Request, Response } from "express";
import cors from "cors";

const pool = require("./db");
const app: Express = express();

app.use(cors());
app.use(express.json());

require('./auth')(app);

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

app.get("/hello",(req: Request, res: Response) =>{

        res.send("Hello moto!");
})

const PORT = process.env.PORT;

app.listen(PORT || 5000, ()=> {console.log("server started on http://localhost:5000")})
