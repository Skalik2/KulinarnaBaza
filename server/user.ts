import {Express} from "express";
const { hashPassword, comparePasswords } = require("./hashing");
const bodyParser = require("body-parser");
const pool = require("./db");

module.exports = function(app : Express) {
    app.patch("/api/user/changeEmail", bodyParser.json(), async (req : any, res) => {
        try {
            const {email} = req.body;
            const user = await pool.query(
                "SELECT * FROM public.uzytkownik WHERE email = $1",
                [req.session.user]
            );
            if (user.rowCount != 1) {
                console.error("Session invalid");
                res.status(401).json({ error: "Invalid session" });
                return;
            }
            const result = pool.query("UPDATE public.uzytkownik SET email = $1 WHERE id_uzytkownika = $2;", [email, user.rows[0].id_uzytkownika]);
            req.session.user = email
            res.status(201).json( {"response": "Changed email successfully!"} );
        }
        catch (err) {
            console.error("Error when changing email:", err);
            res.status(500).json({ error: "Internal server error!" });
        }
    });

    app.patch("/api/user/changeName", bodyParser.json(), async (req : any, res) => {
        try {
            const {name} = req.body;
            const user = await pool.query(
                "SELECT * FROM public.uzytkownik WHERE email = $1",
                [req.session.user]
            );
            if (user.rowCount != 1) {
                console.error("Session invalid");
                res.status(401).json({ error: "Invalid session" });
                return;
            }
            const result = pool.query("UPDATE public.uzytkownik SET imie = $1 WHERE id_uzytkownika = $2;", [name, user.rows[0].id_uzytkownika]);

            res.status(201).json( {"response": "Changed name successfully!"} );
        }
        catch (err) {
            console.error("Error when changing name:", err);
            res.status(500).json({ error: "Internal server error!" });
        }
    });

    app.patch("/api/user/changeLastName", bodyParser.json(), async (req : any, res) => {
        try {
            const {lastName} = req.body;
            const user = await pool.query(
                "SELECT * FROM public.uzytkownik WHERE email = $1",
                [req.session.user]
            );
            if (user.rowCount != 1) {
                console.error("Session invalid");
                res.status(401).json({ error: "Invalid session" });
                return;
            }
            const result = pool.query("UPDATE public.uzytkownik SET nazwisko = $1 WHERE id_uzytkownika = $2;", [lastName, user.rows[0].id_uzytkownika]);

            res.status(201).json( {"response": "Changed last name successfully!"} );
        }
        catch (err) {
            console.error("Error when changing last name:", err);
            res.status(500).json({ error: "Internal server error!" });
        }
    });

    app.patch("/api/user/changePassword", bodyParser.json(), async (req : any, res) => {
        try {
            const {password, oldPassword} = req.body;
            const user = await pool.query(
                "SELECT * FROM public.uzytkownik WHERE email = $1",
                [req.session.user]
            );
            if (user.rowCount != 1) {
                console.error("Session invalid");
                res.status(401).json({ error: "Invalid session" });
                return;
            }
            if (!comparePasswords(oldPassword, user.rows[0].haslo)) {
                console.error("Incorrect old password!");
                res.status(400).json({ error: "Old password incorrect!" });
                return;
            }
            const hpass = await hashPassword(password);
            const result = pool.query("UPDATE public.uzytkownik SET haslo = $1 WHERE id_uzytkownika = $2;", [hpass, user.rows[0].id_uzytkownika]);

            res.status(201).json( {"response": "Changed password successfully!"} );
        }
        catch (err) {
            console.error("Error when changing password:", err);
            res.status(500).json({ error: "Internal server error!" });
        }
    });
}