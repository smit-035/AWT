const db = require("../config/db");

// GET STATS
exports.getStats = async (req, res) => {
  try {
    const total = await db.query("SELECT COUNT(*) FROM rooms");
    const occupied = await db.query("SELECT COUNT(*) FROM rooms WHERE status='Occupied'");

    res.json({
      total: parseInt(total.rows[0].count),
      occupied: parseInt(occupied.rows[0].count),
      available: parseInt(total.rows[0].count) - parseInt(occupied.rows[0].count)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching stats" });
  }
};

// GET REVENUE
exports.getRevenue = async (req, res) => {
  try {
    const result = await db.query("SELECT SUM(total_amount) FROM history"); // ⚠️ check column name
    res.json({ sum: result.rows[0].sum || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching revenue" });
  }
};

// GET HISTORY ✅
exports.getHistory = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM history ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching history" });
  }
};