import { Express } from "express";
const session = require("express-session");
const bodyParser = require("body-parser");
const pool = require("./db");

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

  app.get("/api/tags", bodyParser.json(), async (req: any, res) => {
    try {
        const result = await pool.query("SELECT * FROM tag")

      res.status(200).json({ response: result.rows});
    } 
    catch (err) {
      console.error("Tags GET failed", err);
      res.status(500).json({ error: "Tags GET failed" });
    }
  });

  app.get("/api/tags/:tagId", bodyParser.json(), async (req: any, res) => {
    try {
        const result = await pool.query(`SELECT * FROM tag WHERE id_tagu = ${req.params.tagId}`)

      res.status(200).json({ response: result.rows[0].nazwa});
    } 
    catch (err) {
      console.error("Tags GET failed", err);
      res.status(500).json({ error: "Tags GET failed" });
    }
  });


  
};
