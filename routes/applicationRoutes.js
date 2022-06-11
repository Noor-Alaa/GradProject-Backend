const express = require("express");
const applicationController = require("../controllers/applicationController");

const router = express.Router();

router.post("/", applicationController.createApplication);
router.get("/:hostId", applicationController.getHostApplication);
router.delete("/:hostId", applicationController.deleteHostApplcation);
module.exports = router;
