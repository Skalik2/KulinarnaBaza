import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();

app.use(cors());

app.get("/api",(req: Request, res: Response) =>{

        res.json({"testServera": ["dziala", "nie dziala", "może dziala"]});

})
app.get("/hello",(req: Request, res: Response) =>{

        res.send("Hello moto!");
})

const PORT = process.env.PORT;

app.listen(PORT || 5000, ()=> {console.log("server started on http://localhost:5000")})
