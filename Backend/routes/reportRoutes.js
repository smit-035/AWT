const express = require("express");
const router = express.Router();
const report = require("../controllers/reportController");

router.get("/stats", report.getStats);
router.get("/revenue", report.getRevenue);
router.get("/history", report.getHistory);

module.exports = router;