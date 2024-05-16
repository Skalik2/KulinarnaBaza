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
      let errList = []  
      console.log(req.body);
      const input = req.body.skladniki
      for (let i =0; i < input.length; i++){
      let valid = await pool.query(`SELECT * FROM skladnik_w_lodowce WHERE id_skladnik = ${input[i].id_skladnik} and id_uzytkownika = ${req.params.userId}`)
      console.log(valid)
      if (valid.rowCount === 0){
      await pool.query(
        `INSERT INTO skladnik_w_lodowce VALUES (${input[i].id_skladnik}, ${req.params.userId}, ${input[i].ilosc})`
      );}
      else {
        errList.push(input[i].id_skladnik)
      }
    }

      console.log(`Successfully added ingredients to user ${req.params.userId}'s fridge. Ingredients already in fridge (not added): ${errList}`);
      res.status(200).json({ response: `Ingredients added successfully! Not added: ${errList}` });
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

  app.delete("/api/fridge/:userId", bodyParser.json(), async (req: any, res) => {
    try {
      
      console.log(req.body);
      
      const result = await pool.query(
        `DELETE FROM skladnik_w_lodowce WHERE id_uzytkownika = ${req.params.userId} and id_skladnik = ${req.body.id_skladnik}`
        
      );

      console.log(`User ${req.params.userId}'s DELETE from fridge success`);
      res.status(200).json({ response: "essa byku" });
    } 
    catch (err) {
      console.error("Fridge DELETE method fail", err);
      res.status(500).json({ error: "Fridge DELETE method fail" });
    }
  });
};
