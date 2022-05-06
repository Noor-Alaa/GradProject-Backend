const express = require("express");
const applicationController = require("../controllers/applicationController");

const router = express.Router();

router.post("/", applicationController.createApplication);
router.get("/:hostId", applicationController.getHostApplication);

module.exports = router;
