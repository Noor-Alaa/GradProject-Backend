const express = require("express");
const localUsersController = require("../controllers/localUsersController");

const router = express.Router();

router.post("/", localUsersController.createLocalUsers);
router.get("/:hostId", localUsersController.getHostLocalUsers);

module.exports = router;
