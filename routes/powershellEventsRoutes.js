const express = require("express");
const powershellEventsController = require("../controllers/powershellEventsController");

const router = express.Router();

router.post("/", powershellEventsController.createPowershellEvents);
router.get("/:hostId", powershellEventsController.getHostPowershellEvents);

module.exports = router;
