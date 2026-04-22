const express = require("express");
const router = express.Router();
const booking = require("../controllers/bookingController");

router.get("/", booking.getBookings);
router.post("/", booking.createBooking);

module.exports = router;