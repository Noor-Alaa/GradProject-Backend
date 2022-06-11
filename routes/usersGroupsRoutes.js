const express = require("express");
const usersGroupsController = require("../controllers/usersGroupsController");

const router = express.Router();

router.post("/", usersGroupsController.createUsersGroups);
router.get("/:hostId", usersGroupsController.getHostUsersGroups);
router.delete("/:hostId", usersGroupsController.deleteHostUsersGroups);
module.exports = router;
