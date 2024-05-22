import { Express } from "express";
const session = require("express-session");
const bodyParser = require("body-parser");
const pool = require("./db");
const fs = require("fs");
import path from "path";


declare global {
  namespace Express {
    interface Session {
      user?: any;
    }
  }
}

module.exports = function (app: Express) {
  app.use(
    session({
      secret: "whatdoIwriteherepleasetellmetutorials",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  app.get("/api/recipes/image/:recipeId", (req, res) => {
    res.sendFile(path.join(__dirname, `../images/recipeid_${req.params.recipeId}_thumbnail.png`));
  });

  app.post("/api/recipes/:userId", bodyParser.json(), async (req: any, res) => {
    try {
      let id = await pool.query(`SELECT max(id_przepisu) FROM przepis`);
      console.log(id)
      id = id.rows[0].max + 1
      if (id == null){
        id = 1
      }
      console.log(id);
      const filename = `./images/recipeid_${id}_thumbnail.png`;
      let base64Data = req.body.zdjecie.replace(
        /^data:image\/jpeg;base64,/,
        ""
      );
      base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
      fs.writeFile(filename, base64Data, "base64", function (err: any) {
        if (err) {
          console.log(err);
          throw new Error("Image could not be saved");
        } else {
          console.log(`Image ${filename} saved successfully`);
        }
      });
      await pool.query("INSERT INTO przepis VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW()::DATE)", [
        id,
        req.body.tytul,
        req.body.opis,
        req.body.czas_przygotowania,
        req.body.cena,
        0,
        req.params.userId,
        filename
      ]);
      for (let i = 0; i < req.body.skladniki.length; i++) {
        await pool.query(
          `INSERT INTO skladnik_w_przepisie VALUES (${id}, ${req.body.skladniki[i].id_skladnika}, '${req.body.skladniki[i].ilosc}')`
        );
      }
      for (let j = 0; j < req.body.tagi.length; j++) {
        await pool.query(
          `INSERT INTO tag_w_przepisie VALUES (${req.body.tagi[j].id_tagu}, ${id})`
        );
      }

      console.log(
        `Successfully added recipe to user ${req.params.userId}'s collection.`
      );
      res.status(200).json({ response: `Recipe added successfully!` });
    } catch (err) {
      console.error("Adding recipe failed", err);
      res.status(500).json({ error: "Adding recipe failed" });
    }
  });

  app.get("/api/recipes", bodyParser.json(), async (req: any, res) => {
    try {
      const result = await pool.query("SELECT * FROM przepis")
      res.status(200).json({ response: result.rows });
    } catch (err) {
      console.error("Getting recipes failed", err);
      res.status(500).json({ error: "Getting recipes failed" });
    }
  });

  app.get("/api/recipes/:recipeId", bodyParser.json(), async (req: any, res) => {
    try {
      const result = await pool.query(`SELECT * FROM przepis WHERE id_przepisu = ${req.params.recipeId}`)
      const views = result.rows[0].wyswietlenia + 1
      await pool.query(`UPDATE przepis SET wyswietlenia = ${views} WHERE id_przepisu = ${req.params.recipeId}`)
      const ingredients = await pool.query(`SELECT * FROM skladnik_w_przepisie WHERE id_przepisu = ${req.params.recipeId}`)
      res.status(200).json({ przepis: result.rows, skladniki: ingredients.rows });
    } catch (err) {
      console.error(`Getting recipe ${req.params.recipeId} failed`, err);
      res.status(500).json({ error: "Getting recipe failed" });
    }
  });

  app.get("/api/recipes/user/:userId", bodyParser.json(), async (req: any, res) => {
    try {
      const result = await pool.query(`SELECT * FROM przepis WHERE autor = ${req.params.userId}`)
      res.status(200).json({ przepis: result.rows});
    } catch (err) {
      console.error(`Getting user ${req.params.userId}'s collection failed`, err);
      res.status(500).json({ error: "Getting user collection failed" });
    }
  });

  app.put("/api/recipes/:userId/:recipeId", bodyParser.json(), async (req: any, res) => {
    try {
      const valid = await pool.query(`SELECT * FROM przepis WHERE id_przepisu = ${req.params.recipeId}`)
      if (valid.rowCount === 1){
        await pool.query(`INSERT INTO ulubione VALUES (${req.params.recipeId}, ${req.params.userId})`)
      }
      else {
        throw new Error(`No recipe with given id: ${req.params.recipeId}`)
      }
      res.status(200).json({ response: `Recipe ${req.params.recipeId} added to user ${req.params.userId}'s favourites`});
    } catch (err) {
      console.error(`Adding recipe to user ${req.params.userId}'s favourite failed`, err);
      res.status(500).json({ error: `Adding recipe to user ${req.params.userId}'s favourite failed`});
    }
  });

  app.get("/api/recipes/:userId/getfav", bodyParser.json(), async (req: any, res) => {
    try {
      const result = await pool.query(`SELECT * FROM przepis JOIN ulubione on przepis.id_przepisu = ulubione.id_przepisu WHERE ulubione.id_uzytkownika = ${req.params.userId}`)
      
      res.status(200).json({ response: result.rows});
    } catch (err) {
      console.error(`Getting user ${req.params.userId}'s favourite failed`, err);
      res.status(500).json({ error: `Getting user ${req.params.userId}'s favourite failed`});
    }
  });

};
