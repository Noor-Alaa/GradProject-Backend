const express = require("express");
const listenPortsController = require("../controllers/listenPortsController");

const router = express.Router();

router.post("/", listenPortsController.createListenPorts);
router.get("/:hostId", listenPortsController.getHostListenPorts);

module.exports = router;
