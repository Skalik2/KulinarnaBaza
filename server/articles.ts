import { Express } from "express";
const session = require("express-session");
const bodyParser = require("body-parser");
const pool = require("./db");
const fs = require("fs");
import path = require("path");

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

  app.get("/api/articles/image/:articleId", (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        `../images/article_${req.params.articleId}_thumbnail.png`
      )
    );
  });

  app.post(
    "/api/articles/:userId",
    bodyParser.json(),
    async (req: any, res) => {
      try {
        let id = await pool.query(`SELECT max(id_artykulu) FROM artykul`);
        id = id.rows[0].max + 1;
        if (id == null) {
          id = 1;
        }
        console.log(id);
        const filename = `./images/article_${id}_thumbnail.png`;
        let base64Data = req.body.zdjecie.replace(
          /^data:image\/jpeg;base64,/,
          ""
        );
        base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
        //console.log(base64Data);
        fs.writeFile(filename, base64Data, "base64", function (err: any) {
          if (err) {
            throw new Error("Image could not be saved");
          } else {
            console.log(`Image ${filename} saved successfully`);
          }
        });
        await pool.query(
          "INSERT INTO artykul VALUES ($1,$2,$3,$4,$5,NOW()::DATE)",
          [id, req.body.tytul, req.body.opis, filename, req.params.userId]
        );
        console.log(`Successfully added article by user: ${req.params.userId}`);
        res.status(200).json({ response: `Article added successfully!` });
      } catch (err) {
        console.error("Adding article failed", err);
        res.status(500).json({ error: "Adding article failed" });
      }
    }
  );

  app.get("/api/articles", bodyParser.json(), async (req: any, res) => {
    try {
      const result = await pool.query("SELECT * FROM artykul");
      let tab = [];
      for (let n = 0; n < result.rows.length; n++) {
        const user = await pool.query(
          "SELECT imie from uzytkownik WHERE id_uzytkownika=$1",
          [result.rows[n].autor]
        );
        if (user.rowCount != 1) {
          res.status(401).json({ response: "Internal user name get error!" });
          return;
        }
        tab.push({
          id_artykulu: result.rows[n].id_artykulu,
          tytul: result.rows[n].tytul,
          opis: result.rows[n].opis,
          zdjecie: result.rows[n].zdjecie,
          autor: user.rows[0].imie,
          data_publikacji: result.rows[0].data_publikacji,
        });
      }
      res.status(200).json({ response: tab });
    } catch (err) {
      console.error("Getting articles failed", err);
      res.status(500).json({ error: "Getting articles failed" });
    }
  });

  app.post("/api/articleDetails", bodyParser.json(), async (req: any, res) => {
    try {
      const { articleID } = req.body;

      const article = await pool.query(
        "SELECT tytul, opis, zdjecie, autor, data_publikacji, id_artykulu FROM public.artykul WHERE id_artykulu = $1",
        [articleID]
      );
      if (article.rowCount != 1) {
        res
          .status(401)
          .json({ response: "Article with that id does not exist!" });
        return;
      }
      const user = await pool.query(
        "SELECT imie from uzytkownik WHERE id_uzytkownika=$1",
        [article.rows[0].autor]
      );

      res.status(200).json({
        tytul: article.rows[0].tytul,
        opis: article.rows[0].opis,
        zdjecie: article.rows[0].zdjecie,
        autor: user.rows[0].imie,
        data_publikacji: article.rows[0].data_publikacji,
      });
    } catch (err) {
      console.error("Error when getting article comments:", err);
      res.status(500).json({ error: "Error when getting comments!" });
    }
  });

  app.get("/api/articles/:userId", bodyParser.json(), async (req: any, res) => {
    try {
      const result = await pool.query(`SELECT * FROM artykul WHERE autor= ${req.params.userId}`);
      let tab = [];
      for (let n = 0; n < result.rows.length; n++) {
        const user = await pool.query(
          "SELECT imie from uzytkownik WHERE id_uzytkownika=$1",
          [result.rows[n].autor]
        );
        if (user.rowCount != 1) {
          res.status(401).json({ response: "Internal user name get error!" });
          return;
        }
        tab.push({
          id_artykulu: result.rows[n].id_artykulu,
          tytul: result.rows[n].tytul,
          opis: result.rows[n].opis,
          zdjecie: result.rows[n].zdjecie,
          autor: user.rows[0].imie,
          data_publikacji: result.rows[0].data_publikacji,
        });
      }
      res.status(200).json({ response: tab });
    } catch (err) {
      console.error("Getting articles failed", err);
      res.status(500).json({ error: "Getting articles failed" });
    }
  });

  app.delete("/api/articles/:articleId", bodyParser.json(), async (req: any, res) => {
    try {
      await pool.query(
        `DELETE FROM komentarz WHERE id_artykulu = ${req.params.articleId}`
      );
      await pool.query(
        `DELETE FROM artykul WHERE id_artykulu = ${req.params.articleId}`
      );
      
      const filename = `./images/recipeid_${req.params.articleId}_thumbnail.png`
      fs.rmSync(filename, {
        force: true,
      });


      res.status(200).json({ response: `Article ${req.params.articleId} removed successfully`});
    } catch (err) {
      console.error(`Article ${req.params.articleId} could not be deleted`, err);
      res.status(500).json({
        error: `Article ${req.params.articleId} could not be deleted`,
      });
    }
  });

};
