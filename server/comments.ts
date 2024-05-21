import {Express} from "express";
const bodyParser = require("body-parser");
const pool = require("./db");

module.exports = function(app : Express) {
    app.put("/api/comment/addForRecipe", bodyParser.json(), async (req : any, res) => {
        try {
            const { recipeID, commentBody } = req.body;
            if (req.session == null || req.session.user == null || req.session.authenticated == false) {
                res.status(401).json({ response: "User session is not valid!" });
                return;
            }
            const result = await pool.query(
                "SELECT id_uzytkownika FROM public.uzytkownik WHERE email = $1",
                [req.session.user]
            );
            if (result.rowCount != 1){
                res.status(401).json({ response: "User session is not valid!" });
                return;
            }

            const recipe = await pool.query(
                "SELECT id_przepisu FROM public.przepis WHERE id_przepisu = $1",
                [recipeID]);
            if (recipe.rowCount != 1){
                res.status(401).json({ response: "Recipe with that id does not exist!!" });
                return;
            }

            const result1 = await pool.query(
                `INSERT INTO public.komentarz (id_uzytkownika, opis,id_artykulu, id_przepisu) VALUES ($1, '` + commentBody + `', null, $2);`,
                [result.rows[0].id_uzytkownika, recipeID]
            );

            res.status(201).json( {"response": "Added comment to recipe successfully!"} );
        }
        catch (err) {
            console.error("Error when adding recipe comment:", err);
            res.status(500).json({ error: "Error when adding comment!" });
        }
    });

    app.put("/api/comment/addForArticle", bodyParser.json(), async (req : any, res) => {
        try {
            const { articleID, commentBody } = req.body;
            if (req.session == null || req.session.user == null || req.session.authenticated == false) {
                res.status(401).json({ response: "User session is not valid!" });
                return;
            }
            const result = await pool.query(
                "SELECT id_uzytkownika FROM public.uzytkownik WHERE email = $1",
                [req.session.user]
            );
            if (result.rowCount != 1){
                res.status(401).json({ response: "User session is not valid!" });
                return;
            }

            const recipe = await pool.query(
                "SELECT id_artykulu FROM public.artykul WHERE id_artykulu = $1",
                [articleID]);
            if (recipe.rowCount != 1){
                res.status(401).json({ response: "Article with that id does not exist!!" });
                return;
            }

            const result1 = await pool.query(
                `INSERT INTO public.komentarz (id_uzytkownika, opis,id_przepisu, id_artykulu) VALUES ($1, '` + commentBody + `', null, $2);`,
                [result.rows[0].id_uzytkownika, articleID]
            );

            res.status(201).json( {"response": "Added comment to article successfully!"} );
        }
        catch (err) {
            console.error("Error when adding article comment:", err);
            res.status(500).json({ error: "Error when adding comment!" });
        }
    });

    app.post("/api/comment/getForRecipe", bodyParser.json(), async (req : any, res) => {
        try {
            const {recipeID} = req.body;

            const recipe = await pool.query(
                "SELECT id_przepisu FROM public.przepis WHERE id_przepisu = $1",
                [recipeID]);
            if (recipe.rowCount != 1) {
                res.status(401).json({response: "Article with that id does not exist!!"});
                return;
            }

            const result1 = await pool.query(
                `SELECT * FROM public.komentarz WHERE id_przepisu = ${recipeID};`
            );

            let tab = []
            for (let n = 0; n < result1.rows.length; n++) {
                // TODO : nazwa zamiast id, gotta go fast for now
                tab.push({"uzytkownik": result1.rows[n].id_uzytkownika, "opis": result1.rows[n].opis})
            }

            res.status(200).json(tab);
        } catch (err) {
            console.error("Error when getting article comments:", err);
            res.status(500).json({error: "Error when getting comments!"});
        }
    });

    app.post("/api/comment/getForArticle", bodyParser.json(), async (req : any, res) => {
        try {
            const { articleID } = req.body;

            const recipe = await pool.query(
                "SELECT id_artykulu FROM public.artykul WHERE id_artykulu = $1",
                [articleID]);
            if (recipe.rowCount != 1){
                res.status(401).json({ response: "Article with that id does not exist!!" });
                return;
            }

            const result1 = await pool.query(
                `SELECT * FROM public.komentarz WHERE id_artykulu = ${articleID};`
            );

            let tab = []
            for (let n = 0; n < result1.rows.length; n++) {
                // TODO : nazwa zamiast id, gotta go fast for now
                tab.push({"uzytkownik" : result1.rows[n].id_uzytkownika, "opis" : result1.rows[n].opis})
            }

            res.status(200).json( tab );
        }
        catch (err) {
            console.error("Error when getting article comments:", err);
            res.status(500).json({ error: "Error when getting comments!" });
        }
    });
}