const express = require("express");
const scheduledTasksController = require("../controllers/scheduledTasksController");

const router = express.Router();

router.post("/", scheduledTasksController.createScheduledTasks);
router.get("/:hostId", scheduledTasksController.getHostScheduledTasks);
router.delete("/:hostId", scheduledTasksController.deleteHostScheduledTasks);
module.exports = router;
