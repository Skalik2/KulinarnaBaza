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
      secret: "AVerySecretStringForASecret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  app.get("/api/recipes/image/:recipeId", (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        `../images/recipeid_${req.params.recipeId}_thumbnail.png`
      )
    );
  });

  app.post("/api/recipes/:userId", bodyParser.json(), async (req: any, res) => {
    try {
      if (req.session == null || req.session.user == null || req.session.authenticated == false) {
        res.status(401).json({ response: "User session is not valid!" });
        return;
      }
      {
        const result = await pool.query(
            "SELECT id_uzytkownika FROM public.uzytkownik WHERE email = $1",
            [req.session.user]
        );
        if (result.rowCount != 1 || req.params.userId != result.rows[0].id_uzytkownika){
          res.status(401).json({ response: "User session is not valid!" });
          return;
        }
      }
      let id = await pool.query(`SELECT max(id_przepisu) FROM przepis`);
      console.log(id);
      id = id.rows[0].max + 1;
      if (id == null) {
        id = 1;
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
      await pool.query(
        "INSERT INTO przepis VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW()::DATE)",
        [
          id,
          req.body.tytul,
          req.body.opis,
          req.body.czas_przygotowania,
          req.body.cena,
          0,
          req.params.userId,
          filename,
        ]
      );
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
      const result = await pool.query("SELECT * FROM przepis");
      res.status(200).json({ response: result.rows });
    } catch (err) {
      console.error("Getting recipes failed", err);
      res.status(500).json({ error: "Getting recipes failed" });
    }
  });

  app.get(
    "/api/recipes/:recipeId",
    bodyParser.json(),
    async (req: any, res) => {
      try {
        const result = await pool.query(
          `SELECT * FROM przepis WHERE id_przepisu = ${req.params.recipeId}`
        );
        const views = result.rows[0].wyswietlenia + 1;
        await pool.query(
          `UPDATE przepis SET wyswietlenia = ${views} WHERE id_przepisu = ${req.params.recipeId}`
        );
        const ingredients = await pool.query(
          `SELECT skladnik.id_skladnik, skladnik.nazwa, skladnik_w_przepisie.ilosc  FROM skladnik_w_przepisie JOIN skladnik ON skladnik_w_przepisie.id_skladnika = skladnik.id_skladnik WHERE skladnik_w_przepisie.id_przepisu = ${req.params.recipeId}`
        );
        const tags = await pool.query(
          `SELECT tag.id_tagu, tag.nazwa FROM tag_w_przepisie JOIN tag ON tag_w_przepisie.id_tagu = tag.id_tagu WHERE tag_w_przepisie.id_przepisu = ${req.params.recipeId}`
        );
        res.status(200).json({
          przepis: result.rows,
          skladniki: ingredients.rows,
          tagi: tags.rows,
        });
      } catch (err) {
        console.error(`Getting recipe ${req.params.recipeId} failed`, err);
        res.status(500).json({ error: "Getting recipe failed" });
      }
    }
  );

  app.get(
    "/api/recipes/user/:userId",
    bodyParser.json(),
    async (req: any, res) => {
      try {
        const result = await pool.query(
          `SELECT * FROM przepis WHERE autor = ${req.params.userId}`
        );
        res.status(200).json({ przepis: result.rows });
      } catch (err) {
        console.error(
          `Getting user ${req.params.userId}'s collection failed`,
          err
        );
        res.status(500).json({ error: "Getting user collection failed" });
      }
    }
  );

  app.put(
    "/api/recipes/:userId/:recipeId",
    bodyParser.json(),
    async (req: any, res) => {
      try {
        {
          if (req.session == null || req.session.user == null || req.session.authenticated == false) {
            res.status(401).json({ response: "User session is not valid!" });
            return;
          }
          const result = await pool.query(
              "SELECT id_uzytkownika FROM public.uzytkownik WHERE email = $1",
              [req.session.user]
          );
          if (result.rowCount != 1 || req.params.userId != result.rows[0].id_uzytkownika){
            res.status(401).json({ response: "User session is not valid!" });
            return;
          }
        }
        const valid = await pool.query(
          `SELECT * FROM przepis WHERE id_przepisu = ${req.params.recipeId}`
        );
        if (valid.rowCount === 1) {
          await pool.query(
            `INSERT INTO ulubione VALUES (${req.params.recipeId}, ${req.params.userId})`
          );
        } else {
          throw new Error(`No recipe with given id: ${req.params.recipeId}`);
        }
        res.status(200).json({
          response: `Recipe ${req.params.recipeId} added to user ${req.params.userId}'s favourites`,
        });
      } catch (err) {
        console.error(
          `Adding recipe to user ${req.params.userId}'s favourite failed`,
          err
        );
        res.status(500).json({
          error: `Adding recipe to user ${req.params.userId}'s favourite failed`,
        });
      }
    }
  );

  app.delete(
    "/api/recipes/:userId/:recipeId",
    bodyParser.json(),
    async (req: any, res) => {
      try {
        if (req.session == null || req.session.user == null || req.session.authenticated == false) {
          res.status(401).json({ response: "User session is not valid!" });
          return;
        }
        {
          const result = await pool.query(
              "SELECT id_uzytkownika FROM public.uzytkownik WHERE email = $1",
              [req.session.user]
          );
          if (result.rowCount != 1){
            res.status(401).json({ response: "User session is not valid!" });
            return;
          }
          const fav = await pool.query(
              "SELECT * FROM public.ulubione WHERE id_uzytkownika = $1 AND id_przepisu = $2",
              [req.params.userId, req.params.recipeId]
          );
          if (fav.rowCount != 1){
            res.status(401).json({ response: "Invalid favourite/user combination!" });
            return;
          }
        }
        await pool.query(
          `DELETE FROM ulubione WHERE id_uzytkownika = ${req.params.userId} and id_przepisu = ${req.params.recipeId}`
        );
        res.status(200).json({
          response: `Recipe ${req.params.recipeId} deleted from user ${req.params.userId}'s favourites`,
        });
      } catch (err) {
        console.error(
          `Removing recipe from user ${req.params.userId}'s favourite failed`,
          err
        );
        res.status(500).json({
          error: `Removing recipe from user ${req.params.userId}'s favourite failed`,
        });
      }
    }
  );

  app.get(
    "/api/recipes/:userId/getfav",
    bodyParser.json(),
    async (req: any, res) => {
      try {
        const result = await pool.query(
          `SELECT * FROM przepis JOIN ulubione on przepis.id_przepisu = ulubione.id_przepisu WHERE ulubione.id_uzytkownika = ${req.params.userId}`
        );

        res.status(200).json({ response: result.rows });
      } catch (err) {
        console.error(
          `Getting user ${req.params.userId}'s favourite failed`,
          err
        );
        res.status(500).json({
          error: `Getting user ${req.params.userId}'s favourite failed`,
        });
      }
    }
  );

  app.get(
    "/api/recipes/byTag/:tagId",
    bodyParser.json(),
    async (req: any, res) => {
      try {
        const result = await pool.query(
          `SELECT * FROM przepis JOIN tag_w_przepisie on przepis.id_przepisu = tag_w_przepisie.id_przepisu WHERE tag_w_przepisie.id_tagu = ${req.params.tagId}`
        );

        res.status(200).json({ response: result.rows });
      } catch (err) {
        console.error(
          `Getting recipes by tag id: ${req.params.tagId} failed`,
          err
        );
        res.status(500).json({
          error: `Getting recipes by tag id: ${req.params.tagId} failed`,
        });
      }
    }
  );

  app.get(
    "/api/recipesByIngredient/:ingredientId",
    bodyParser.json(),
    async (req: any, res) => {
      try {
        const result = await pool.query(
          `SELECT * FROM przepis JOIN skladnik_w_przepisie on przepis.id_przepisu = skladnik_w_przepisie.id_przepisu WHERE skladnik_w_przepisie.id_skladnika = ${req.params.ingredientId}`
        );

        res.status(200).json({ response: result.rows });
      } catch (err) {
        console.error(
          `Getting recipes by ingredient id: ${req.params.ingredientId} failed`,
          err
        );
        res.status(500).json({
          error: `Getting recipes by tag id: ${req.params.ingredientId} failed`,
        });
      }
    }
  );

  app.get(
    "/api/recipesByIngredientAndTag/",
    bodyParser.json(),
    async (req: any, res) => {
      try {
        const result = await pool.query(
          await pool.query(`SELECT * FROM public.przepis join skladnik_w_przepisie on przepis.id_przepisu = skladnik_w_przepisie.id_przepisu join tag_w_przepisie on tag_w_przepisie.id_przepisu = przepis.id_przepisu
          where skladnik_w_przepisie.id_skladnika = ${req.body.id_skladnika} and tag_w_przepisie.id_tagu = ${req.body.id_tagu}`)
        );

        res.status(200).json({ response: result.rows });
      } catch (err) {
        console.error(
          `Getting recipes by ingredient id: ${req.body.ingredientId} and tag id: ${req.body.tagId} failed`,
          err
        );
        res.status(500).json({
          error: `Getting recipes by ingredient id: ${req.body.ingredientId} and tag id: ${req.body.tagId} failed`,
        });
      }
    }
  );

  app.get("/api/topRecipes", bodyParser.json(), async (req: any, res) => {
    try {
      const result = await pool.query(
        `SELECT * FROM przepis ORDER BY wyswietlenia DESC LIMIT 10`
      );

      res.status(200).json({ response: result.rows });
    } catch (err) {
      console.error(`Getting top 10 recipes failed`, err);
      res.status(500).json({
        error: `Getting top 10 recipes failed`,
      });
    }
  });

  app.patch(
    "/api/recipes/:recipeId",
    bodyParser.json(),
    async (req: any, res) => {
      try {
        {
          const result = await pool.query(
              "SELECT id_uzytkownika FROM public.uzytkownik WHERE email = $1",
              [req.session.user]
          );
          if (result.rowCount != 1){
            res.status(401).json({ response: "User session is not valid!" });
            return;
          }
          const rec = await pool.query(
              "SELECT * FROM public.przepis WHERE id_przepisu = $1",
              [req.params.recipeId]
          );
          if (rec.rowCount != 1 || rec.rows[0].autor != result.rows[0].id_uzytkownika){
            res.status(401).json({ response: "Recipe does not exist or belong to the user!" });
            return;
          }
        }
        await pool.query(
          `UPDATE przepis SET tytul = '${req.body.tytul}', opis = '${req.body.opis}', czas_przygotowania = ${req.body.czas_przygotowania}, cena = ${req.body.cena} WHERE id_przepisu = ${req.params.recipeId}`
        );
        await pool.query(
          `DELETE FROM tag_w_przepisie WHERE id_przepisu = ${req.params.recipeId}`
        );
        await pool.query(
          `DELETE FROM skladnik_w_przepisie WHERE id_przepisu = ${req.params.recipeId}`
        );
        for (let i = 0; i < req.body.skladniki.length; i++) {
          await pool.query(
            `INSERT INTO skladnik_w_przepisie VALUES (${req.params.recipeId}, ${req.body.skladniki[i].id_skladnika}, '${req.body.skladniki[i].ilosc}')`
          );
        }
        for (let j = 0; j < req.body.tagi.length; j++) {
          await pool.query(
            `INSERT INTO tag_w_przepisie VALUES (${req.body.tagi[j].id_tagu}, ${req.params.recipeId})`
          );
        }
        if (req.body.zdjecie) {
          const filename = `./images/recipeid_${req.params.recipeId}_thumbnail.png`;

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
        }
        res
          .status(200)
          .json({ response: `Recipe ${req.params.recipeId} updated` });
      } catch (err) {
        console.error(
          `Recipe ${req.params.recipeId} could not be edited!`,
          err
        );
        res.status(500).json({
          error: `Recipe ${req.params.recipeId} could not be edited! ${err}`,
        });
      }
    }
  );

  app.delete("/api/recipes/:recipeId", bodyParser.json(), async (req: any, res) => {
    try {
      {
        const result = await pool.query(
            "SELECT id_uzytkownika FROM public.uzytkownik WHERE email = $1",
            [req.session.user]
        );
        if (result.rowCount != 1){
          res.status(401).json({ response: "User session is not valid!" });
          return;
        }
        const rec = await pool.query(
            "SELECT * FROM public.przepis WHERE id_przepisu = $1",
            [req.params.recipeId]
        );
        if (rec.rowCount != 1 || rec.rows[0].autor != result.rows[0].id_uzytkownika){
          res.status(401).json({ response: "Recipe does not exist or belong to the user!" });
          return;
        }
      }
      await pool.query(
        `DELETE FROM ulubione WHERE id_przepisu = ${req.params.recipeId}`
      );
      await pool.query(
        `DELETE FROM komentarz WHERE id_przepisu = ${req.params.recipeId}`
      );
      await pool.query(
        `DELETE FROM tag_w_przepisie WHERE id_przepisu = ${req.params.recipeId}`
      );
      await pool.query(
        `DELETE FROM skladnik_w_przepisie WHERE id_przepisu = ${req.params.recipeId}`
      );
      await pool.query(
        `DELETE FROM plan WHERE id_przepisu = ${req.params.recipeId}`
      );
      await pool.query(
        `DELETE FROM przepis WHERE id_przepisu = ${req.params.recipeId}`
      );
      const filename = `./images/recipeid_${req.params.recipeId}_thumbnail.png`
      fs.rmSync(filename, {
        force: true,
      });


      res.status(200).json({ response: `Recipe ${req.params.recipeId} removed successfully`});
    } catch (err) {
      console.error(`Recipe ${req.params.recipeId} could not be deleted`, err);
      res.status(500).json({
        error: `Recipe ${req.params.recipeId} could not be deleted`,
      });
    }
  });


};
