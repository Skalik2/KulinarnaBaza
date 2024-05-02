import {Express} from "express";
const session = require("express-session");
const bodyParser = require("body-parser");
const pool = require("./db");

declare global {
    namespace Express {
        interface Session {
            user?: any,
        }
    }
}

module.exports = function(app : Express) {

    app.use(session({
        secret: 'whatdoIwriteherepleasetellmetutorials',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));

    app.post("/api/login", bodyParser.json(), async(req : any, res) => {
        try {
            const { email, password } = req.body;
            console.log("Login request:\n", email, password);
            // TODO: Change to hashed
            const result = await pool.query(
                "SELECT * FROM public.uzytkownik WHERE email = $1 AND haslo = $2", [email, password]
            );
            //console.log(result.rowCount);
            if (result.rowCount != 1) {
                console.error("Incorrect credentials!");
                res.status(500).json({ error: "Incorrect email and password combination!" });
                return;
            }
            req.session.userId = result.rows[0].id_uzytkownika;
            res.status(256).json( {"response": "Logged in successfully!"} );

        }
        catch (err) {
            console.error("Error when logging in:", err);
            res.status(500).json({ error: "Error when logging in!" });
        }
    });

    app.get("/api/logout", bodyParser.json(), async(req : any, res) => {
        try {
            req.session.userId = null;
            req.session.destroy()
            req.session = null;
            res.status(256).json( {"response": "Logged out successfully!"} );
        }
        catch (err) {
            console.error("Error when logging out:", err);
            res.status(500).json({ error: "Error when logging out!" });
        }
    });

    app.put("/api/register", bodyParser.json(), async (req : any, res) => {
        try {
            const { email, password, name, lastname } = req.body;
            console.log("Register request:\n", email, password, name, lastname);
            // TODO: Change to hashed
            const result1 = await pool.query(
                "insert into public.uzytkownik (imie, nazwisko, haslo, email) values ($1, $2, $3, $4);", [name, lastname, password, email]
            );
            const result2 = await pool.query(
                "SELECT * FROM public.uzytkownik WHERE email = $1 AND haslo = $2", [email, password]
            );
            console.log(result2.rows);

            if (result2.rowCount != 1) {
                console.error("Incorrect credentials!");
                res.status(500).json({ error: "Couldn't register!!" });
                return;
            }
            req.session.userId = result2.rows[0].id_uzytkownika;
            res.status(256).json( {"response": "Registered successfully!"} );
        }
        catch (err) {
            console.error("Error when registering:", err);
            res.status(500).json({ error: "Error when registering!" });
        }
    });

}