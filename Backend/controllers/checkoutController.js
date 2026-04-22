const db = require("../config/db");

exports.checkout = async (req, res) => {
  const { booking_id, extra } = req.body;

  const result = await db.query(`
    SELECT b.*, r.room_number 
    FROM bookings b
    JOIN rooms r ON b.room_id = r.id
    WHERE b.id=$1
  `, [booking_id]);

  const b = result.rows[0];

  let days = Math.max(
    1,
    (new Date(b.checkout) - new Date(b.checkin)) / (1000 * 60 * 60 * 24)
  );

  let total = days * 2000 + (extra || 0);

  await db.query(
    "INSERT INTO history (guest_name, room_number, checkin, checkout, total_amount) VALUES ($1,$2,$3,$4,$5)",
    [b.guest_name, b.room_number, b.checkin, b.checkout, total]
  );

  await db.query("UPDATE rooms SET status='Available' WHERE id=$1", [b.room_id]);
  await db.query("DELETE FROM bookings WHERE id=$1", [booking_id]);

  res.json({ message: "Checkout done", total });
};