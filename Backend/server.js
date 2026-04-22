const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/checkout", require("./routes/checkoutRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});