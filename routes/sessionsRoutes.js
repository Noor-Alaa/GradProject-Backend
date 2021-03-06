const express = require("express");
const sessionsController = require("../controllers/sessionsController");

const router = express.Router();

router.post("/", sessionsController.createSessions);
router.get("/:hostId", sessionsController.getHostSessions);
router.delete("/:hostId", sessionsController.deleteHostSessions);
module.exports = router;
