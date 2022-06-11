const express = require("express");
const groupsController = require("../controllers/groupsController");

const router = express.Router();

router.post("/", groupsController.createGroups);
router.get("/:hostId", groupsController.getHostGroups);
router.delete("/:hostId", groupsController.deleteHostGroups);
module.exports = router;
