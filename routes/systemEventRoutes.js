const express = require("express");
const systemEventController = require("../controllers/systemEventController");

const router = express.Router();

router.post("/", systemEventController.createSystemEvent);
router.get("/:hostId", systemEventController.getHostSystemEvent);

module.exports = router;
