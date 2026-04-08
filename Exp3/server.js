const express = require("express");
const pool = require("./db");

const app = express();

app.use(express.json());

// ==============================
// TEST ROUTE
// ==============================
app.get("/test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            status: "✅ Connected to DB",
            time: result.rows[0].now
        });
    } catch (err) {
        console.error("❌ DB Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// ==============================
// ADD CONTACT
// ==============================
app.post("/add", async (req, res) => {
    try {
        const { name, phone, email } = req.body;

        if (!name || !phone || !email) {
            return res.status(400).json({ error: "All fields required" });
        }

        const result = await pool.query(
            "INSERT INTO contacts (name, phone, email) VALUES ($1, $2, $3) RETURNING *",
            [name, phone, email]
        );

        console.log("✅ Inserted:", result.rows[0]);

        res.status(201).json({
            message: "Contact added successfully",
            data: result.rows[0]
        });

    } catch (err) {
        console.error("❌ Insert Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// ==============================
// GET ALL CONTACTS
// ==============================
app.get("/contacts", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM contacts ORDER BY id DESC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Fetch Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// ==============================
// DELETE CONTACT
// ==============================
app.delete("/delete/:id", async (req, res) => {
    try {
        await pool.query(
            "DELETE FROM contacts WHERE id=$1",
            [req.params.id]
        );

        res.json({ message: "Deleted successfully" });

    } catch (err) {
        console.error("❌ Delete Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// ==============================
// UPDATE CONTACT
// ==============================
app.put("/update/:id", async (req, res) => {
    try {
        const { name, phone, email } = req.body;

        const result = await pool.query(
            "UPDATE contacts SET name=$1, phone=$2, email=$3 WHERE id=$4 RETURNING *",
            [name, phone, email, req.params.id]
        );

        res.json({
            message: "Updated successfully",
            data: result.rows[0]
        });

    } catch (err) {
        console.error("❌ Update Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// ==============================
// SEARCH CONTACT
// ==============================
app.get("/search/:name", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM contacts WHERE LOWER(name) LIKE LOWER($1)",
            [`%${req.params.name}%`]
        );

        res.json(result.rows);

    } catch (err) {
        console.error("❌ Search Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// ==============================

app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});