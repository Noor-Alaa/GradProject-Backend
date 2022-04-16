const express = require("express");
const securityPatchesController = require("../controllers/securityPatchesController");

const router = express.Router();

router.post("/", securityPatchesController.createSecurityPatches);
router.get("/:hostId", securityPatchesController.getHostSecurityPatches);

module.exports = router;
