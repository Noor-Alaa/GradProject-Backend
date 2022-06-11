const express = require("express");
const securityPatchesController = require("../controllers/securityPatchesController");

const router = express.Router();

router.post("/", securityPatchesController.createSecurityPatches);
router.get("/:hostId", securityPatchesController.getHostSecurityPatches);
router.delete("/:hostId", securityPatchesController.deleteHostSecurityPatches);
module.exports = router;
