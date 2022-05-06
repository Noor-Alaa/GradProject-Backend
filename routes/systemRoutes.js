const express = require("express");
const systemController = require("../controllers/systemController");

const router = express.Router();

router.post("/", systemController.createSystem);
router.get("/:hostId", systemController.getHostSystem);

module.exports = router;
