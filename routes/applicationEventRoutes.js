const express = require("express");
const applicationEventController = require("../controllers/applicationEventController");

const router = express.Router();

router.post("/", applicationEventController.createApplicationEvent);
router.get("/:hostId", applicationEventController.getHostApplicationEvent);
router.delete(
  "/:hostId",
  applicationEventController.deleteHostApplicationEvent
);

module.exports = router;
