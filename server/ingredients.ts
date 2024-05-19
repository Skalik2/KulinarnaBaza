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

  app.get("/api/ingredients", bodyParser.json(), async (req: any, res) => {
    try {      
      const result = await pool.query(
        `SELECT id_skladnik, nazwa FROM skladnik` 
      );

      console.log(`All ingredients GET  method success`);
      res.status(200).json({ response: result.rows });
    } 
    catch (err) {
      console.error("Ingredients GET method fail", err);
      res.status(500).json({ error: "Ingredients GET method fail" });
    }
  });


};
