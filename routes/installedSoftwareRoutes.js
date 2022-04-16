const express = require("express");
const installedSofwareController = require("../controllers/installedSofwareController");

const router = express.Router();

router.post("/", installedSofwareController.createInstalledSoftware);
router.get("/:hostId", installedSofwareController.getHostInstalledSoftware);

module.exports = router;
