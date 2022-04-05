const express = require("express");
const processesController = require("../controllers/processesController");

const router = express.Router();

router.post("/", processesController.createProcesses);
router.get("/:hostId", processesController.getHostProcesses);

module.exports = router;
