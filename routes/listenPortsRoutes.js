const express = require("express");
const listenPortsController = require("../controllers/listenPortsController");

const router = express.Router();

router.post("/", listenPortsController.createListenPorts);
router.get("/:hostId", listenPortsController.getHostListenPorts);
router.delete("/:hostId", listenPortsController.deleteHostListenPorts);
module.exports = router;
