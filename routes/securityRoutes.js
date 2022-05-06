const express = require("express");
const securityController = require("../controllers/securityController");

const router = express.Router();

router.post("/", securityController.createSecurity);
router.get("/:hostId", securityController.getHostSecurity);

module.exports = router;
