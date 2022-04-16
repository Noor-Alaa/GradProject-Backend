const express = require("express");
const usersGroupsController = require("../controllers/usersGroupsController");

const router = express.Router();

router.post("/", usersGroupsController.createUsersGroups);
router.get("/:hostId", usersGroupsController.getHostUsersGroups);

module.exports = router;
