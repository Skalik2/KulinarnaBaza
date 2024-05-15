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

  app.post("/api/fridge/:userId", bodyParser.json(), async (req: any, res) => {
    try {
      
      console.log(req.body);
      
      const result = await pool.query(
        `INSERT INTO skladnik_w_lodowce VALUES (${req.body.ingredientId}, ${req.params.userId}, ${req.body.amount})`
        
      );

      console.log(`Successfully added ${req.body.ingredientId} to ${req.params.userId}'s fridge`);
      res.status(200).json({ response: "Ingredients added successfully!" });
    } 
    catch (err) {
      console.error("Adding ingredients failed", err);
      res.status(500).json({ error: "Adding ingredients failed" });
    }
  });

  app.get("/api/fridge/:userId", bodyParser.json(), async (req: any, res) => {
    try {
      
      console.log(req.body);
      
      const result = await pool.query(
        `SELECT * FROM skladnik_w_lodowce WHERE id_uzytkownika = ${req.params.userId}`
        
      );

      console.log(`User ${req.params.userId} GET fridge ingredients method success`);
      res.status(200).json({ response: result.rows });
    } 
    catch (err) {
      console.error("Fridge GET method fail", err);
      res.status(500).json({ error: "Fridge GET method fail" });
    }
  });
};
