import {Express} from "express";
const bodyParser = require("body-parser");
const pool = require("./db");

module.exports = function(app : Express) {

    app.get("/api/user/details", bodyParser.json(), async (req : any, res) => {
        try {
            if (req.session == null || req.session.user == null || req.session.authenticated == false) {
                res.status(401).json({ response: "User session is not valid!" });
                return;
            }
            const user = await pool.query(
                "SELECT id_uzytkownika, imie, nazwisko, email FROM public.uzytkownik WHERE email = $1",
                [req.session.user]
            );
            if (user.rowCount != 1){
                res.status(401).json({ response: "User session is not valid!" });
                return;
            }
            const recipes = await pool.query("SELECT COUNT(*) AS amount FROM przepis WHERE autor = $1", [user.rows[0].id_uzytkownika]);
            const articles = await pool.query("SELECT COUNT(*) AS amount FROM artykul WHERE autor = $1", [user.rows[0].id_uzytkownika]);
            res.status(201).json( {"imie": user.rows[0].imie, "nazwisko": user.rows[0].nazwisko, "email": user.rows[0].email, "iloscArtykulow": articles.rows[0].amount, "iloscPrzepisow": recipes.rows[0].amount} );
        }
        catch (err) {
            console.error("Error getting user data:", err);
            res.status(500).json({ error: "Internal error!" });
        }
    });

}