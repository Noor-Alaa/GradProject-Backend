const express = require("express");
const sysmonController = require("../controllers/sysmonController");

const router = express.Router();

router.post("/", sysmonController.createSysmon);
router.get("/:hostId", sysmonController.getHostSysmon);

module.exports = router;
