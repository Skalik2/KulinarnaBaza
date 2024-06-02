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

  app.post(
    "/api/mealplanner/:userId",
    bodyParser.json(),
    async (req: any, res) => {
      try {
        await pool.query(
          `INSERT INTO plan VALUES (${req.params.userId}, '${req.body.date}', ${req.body.id_przepisu} )`
        );

        console.log(
          `Recipe ${req.body.id_przepisu} added to user ${req.params.userId}'s meal plan on date ${req.body.date}`
        );
        res
          .status(200)
          .json({
            response: `Recipe ${req.body.id_przepisu} added to user ${req.params.userId}'s meal plan on date ${req.body.date}`,
          });
      } catch (err) {
        console.error(
          `Recipe could not be added to user ${req.params.userId}'s meal plan`,
          err
        );
        res
          .status(500)
          .json({
            error: `Recipe could not be added to user ${req.params.userId}'s meal plan`,
          });
      }
    }
  );

  app.get("/api/mealplanner/:userId/:dayFrom/:dayTo", bodyParser.json(), async (req: any, res) => {
      try {
        //let result: any[] = []
        const result = await pool.query(
          `SELECT plan.id_przepisu, przepis.tytul, plan.data FROM plan JOIN przepis on plan.id_przepisu = przepis.id_przepisu WHERE plan.id_uzytkownika = ${req.params.userId} AND plan.data BETWEEN '${req.params.dayFrom}' AND '${req.params.dayTo}'`
        );
        if (result === undefined) {
          //result = []
          res.status(200).json({ response: result });
        }
        res
          .status(200)
          .json({
            response: result.rows,
          });
      } catch (err) {
        console.error(
          `User ${req.params.userId}'s meal plan could not be acquired`,
          err
        );
        res
          .status(500)
          .json({
            error: `User ${req.params.userId}'s meal plan could not be acquired`,
          });
      }
    }
  );

  app.delete("/api/mealplanner/:userId", bodyParser.json(), async (req: any, res) => {
    try {
       console.log(req.body.id_przepisu, req.body.date, req.params.userId )
       const result = await pool.query(
        `DELETE FROM plan WHERE id_uzytkownika = ${req.params.userId} and id_przepisu = ${req.body.id_przepisu} and data = '${req.body.date}'`)

        
      res
        .status(200)
        .json({
          response: `Recipe ${req.body.id_przepisu} removed from user ${req.params.userId}'s plan for ${req.body.date}`,
        });
    } catch (err) {
      console.error(
        `Recipe ${req.body.id_przepisu} could not be removed from user ${req.params.userId}'s plan for ${req.body.date}`,
        err
      );
      res
        .status(500)
        .json({
          error: `Recipe ${req.body.id_przepisu} could not be removed from user ${req.params.userId}'s plan for ${req.body.date}`,
        });
    }
  }
);
};
