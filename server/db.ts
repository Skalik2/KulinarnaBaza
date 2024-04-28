const Pool = require("pg").Pool;
require('dotenv').config()

const pool = new Pool({
    user: "postgres",
    password: process.env.PGPASSWORD,
    host: "localhost",
    port: 5432,
    database: "FoodKeeper"
});

module.exports = pool;