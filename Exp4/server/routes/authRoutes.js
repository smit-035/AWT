const express    = require("express");
const router     = express.Router();
const controller = require("../controllers/authController");

router.post("/login",        controller.login);
router.post("/user-details", controller.saveUserDetails);
router.get("/admin/users",   controller.getUsers);

module.exports = router;
