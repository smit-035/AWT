const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hotelDB",
  password: "1234",   // 🔴 change this
  port: 5432,
});

module.exports = pool;