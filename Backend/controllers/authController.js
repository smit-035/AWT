const db = require("../config/db");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const result = await db.query(
    "SELECT * FROM users WHERE username=$1 AND password=$2",
    [username, password]
  );

  if (result.rows.length > 0) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};