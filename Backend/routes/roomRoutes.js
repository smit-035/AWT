const express = require("express");
const router = express.Router();
const room = require("../controllers/roomController");

router.get("/", room.getRooms);
router.post("/", room.addRoom);
router.put("/:id", room.toggleRoom);

module.exports = router;