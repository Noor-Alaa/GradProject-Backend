const express = require("express");
const routeController = require("../controllers/routeController");

const router = express.Router();

router.post("/", routeController.createRoute);
router.get("/:hostId", routeController.getHostRoute);
router.delete("/:hostId", routeController.deleteHostRoute);
module.exports = router;
