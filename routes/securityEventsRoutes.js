const express = require("express");
const securityEventsController = require("../controllers/securityEventsController");

const router = express.Router();

router.post("/", securityEventsController.createSecurityEvents);
router.get("/:hostId", securityEventsController.getHostSecurityEvents);

module.exports = router;
