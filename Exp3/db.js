const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "contact_db",
    password: "Jsmsms2005",   // your password
    port: 5432,
});

// Test connection once when server starts
pool.connect()
    .then(client => {
        console.log("✅ PostgreSQL Connected Successfully!");
        client.release();
    })
    .catch(err => {
        console.error("❌ Database Connection Error:", err.message);
    });

module.exports = pool;