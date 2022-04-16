const express = require("express");
const arpCacheController = require("../controllers/arpCacheController");

const router = express.Router();

router.post("/", arpCacheController.createARPcache);
router.get("/:hostId", arpCacheController.getHostARPcache);

module.exports = router;
