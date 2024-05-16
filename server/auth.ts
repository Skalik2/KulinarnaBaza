import {Express} from "express";
const session = require("express-session");
const bodyParser = require("body-parser");
const pool = require("./db");
const { hashPassword, comparePasswords } = require("./hashing");

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

    app.post("/api/login", bodyParser.json(), async(req : any, res: any) => {
        try {
            const { email, password } = req.body;
            console.log("Login request:\n", email, password);

            const result = await pool.query(
                "SELECT * FROM public.uzytkownik WHERE email = $1",
                [email]
            );
            if (result.rowCount != 1) {
                console.error("Incorrect email!");
                res.status(500).json({ error: "Incorrect email and password combination!" });
                return;
            }
            else if (!comparePasswords(password, result.rows[0].haslo)) {
                console.log(password, result.rows[0].haslo);
                console.error("Incorrect password!");
                res.status(500).json({ error: "Incorrect email and password combination!" });
                return;
            }

            console.log("Correct password:",comparePasswords(password, result.rows[0].haslo));
            console.log("Logged in successfully!")
            req.session.user = email;
            req.session.authenticated = true;
            res.status(256).json( {"response": "Logged in successfully!"} );

        }
        catch (err) {
            console.error("Error when logging in:", err);
            res.status(500).json({ error: "Error when logging in!" });
        }
    });


    app.get("/api/checkSession", bodyParser.json(), async(req : any, res) => {
        try {
            if (req.session == null || req.session.user == null || req.session.authenticated == false) {
                res.status(401).json({ response: "User session is not valid!" });
            }
            else {

                const result = await pool.query(
                    "SELECT id_uzytkownika FROM public.uzytkownik WHERE email = $1",
                    [req.session.user]
                );
                if (result.rowCount == 1){
                    res.status(200).json( { response: "Session is valid!"} );
                }
                else {
                    res.status(401).json({ response: "User session is not valid!" });
                }
            }
        }
        catch (err) {
            console.error("Error when checking session:", err);
            res.status(500).json({ error: "Error when checking session!" });
        }
    })

    app.get("/api/logout", bodyParser.json(), async(req : any, res) => {
        try {
            req.session.user = null;
            req.session.destroy()
            req.session = null;
            console.log("Logged out!");
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
            const hpass = await hashPassword(password);
            
            const result2 = await pool.query(
                "SELECT * FROM public.uzytkownik WHERE email = $1",
                [email]
            );
            if (result2.rowCount == 1) {
                console.error("ERROR: A user already exists");
                res.status(500).json({ error: "ERROR: A user already exists" });
                return;
            }

            const result1 = await pool.query(
                "INSERT INTO public.uzytkownik (imie, nazwisko, haslo, email) VALUES ($1, $2, $3, $4);",
                [name, lastname, hpass, email]
            );
        
            req.session.authenticated = true;
            req.session.user = email;
            res.status(256).json( {"response": "Registered successfully!"} );
        }   
        catch (err) {
            console.error("Error when registering:", err);
            res.status(500).json({ error: "Error when registering!" });
        }
    });

}