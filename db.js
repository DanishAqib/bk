const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "margalla3103",
  host: "localhost",
  port: 5432,
  database: "Library",
});

module.exports = pool;
