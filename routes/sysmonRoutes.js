const express = require("express");
const sysmonController = require("../controllers/sysmonController");

const router = express.Router();

router.post("/", sysmonController.createSysmon);
router.get("/", sysmonController.getAllSysmons);

router.get("/:hostId", sysmonController.getHostSysmon);
router.get("/:hostId/:eventId", sysmonController.getSysmonAlert);

router.get("/event/alerts", sysmonController.getSysmonAlert);

module.exports = router;
