const Pool = require("pg").Pool;
require('dotenv').config()

const pool = new Pool({
    user: "kulinarna",//process.env.PGUSER,
    password: "admin",//process.env.PGPASSWORD,
    host: "postgresql_db", //process.env.PGHOST,
    port: 5432,
    database: "kulinarnabaza"//process.env.PGDATABASE
});



module.exports = pool;