import { Express } from "express";
const session = require("express-session");
const bodyParser = require("body-parser");
const pool = require("./db");
const fs = require("fs");

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

    app.post("/api/articles/:userId", bodyParser.json(), async (req: any, res) => {
        try {
          let id = await pool.query(`SELECT max(id_artykulu) FROM artykul`);
          id = id.rows[0].max
          if (id == null){
            id = 1
          }
          console.log(id);
          const filename = `images/article_${id}_thumbnail.png`;
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
          await pool.query("INSERT INTO artykul VALUES ($1,$2,$3,$4,$5,NOW()::DATE)", [
            id,
            req.body.tytul,
            req.body.opis,
            filename,
            req.params.userId
          ]);
          console.log(
            `Successfully added article by user: ${req.params.userId}`
          );
          res.status(200).json({ response: `Article added successfully!` });
        } catch (err) {
          console.error("Adding article failed", err);
          res.status(500).json({ error: "Adding article failed" });
        }
      });

      app.get("/api/articles", bodyParser.json(), async (req: any, res) => {
        try {
          const result = await pool.query("SELECT * FROM artykul")
          res.status(200).json({ response: result.rows });
        } catch (err) {
          console.error("Getting articles failed", err);
          res.status(500).json({ error: "Getting articles failed" });
        }
      });

};
