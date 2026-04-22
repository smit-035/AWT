const db = require("../config/db");

exports.createBooking = async (req, res) => {
  const { guest_name, phone, room_id, checkin, checkout } = req.body;

  await db.query(
    "INSERT INTO bookings (guest_name, phone, room_id, checkin, checkout) VALUES ($1,$2,$3,$4,$5)",
    [guest_name, phone, room_id, checkin, checkout]
  );

  await db.query("UPDATE rooms SET status='Occupied' WHERE id=$1", [room_id]);

  res.json({ message: "Booking created" });
};

exports.getBookings = async (req, res) => {
  const result = await db.query(`
    SELECT b.*, r.room_number 
    FROM bookings b
    JOIN rooms r ON b.room_id = r.id
  `);

  res.json(result.rows);
};