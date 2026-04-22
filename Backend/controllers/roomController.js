const db = require("../config/db");

exports.getRooms = async (req, res) => {
  const result = await db.query("SELECT * FROM rooms ORDER BY id");
  res.json(result.rows);
};

exports.addRoom = async (req, res) => {
  const { room_number, type } = req.body;

  await db.query(
    "INSERT INTO rooms (room_number, type, status) VALUES ($1, $2, 'Available')",
    [room_number, type]
  );

  res.json({ message: "Room added" });
};

exports.toggleRoom = async (req, res) => {
  const id = req.params.id;

  await db.query(
    "UPDATE rooms SET status = CASE WHEN status='Available' THEN 'Occupied' ELSE 'Available' END WHERE id=$1",
    [id]
  );

  res.json({ message: "Room updated" });
};