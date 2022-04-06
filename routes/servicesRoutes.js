const express = require("express");
const servicesController = require("../controllers/servicesController");

const router = express.Router();

router.post("/", servicesController.createServices);
router.get("/:hostId", servicesController.getHostServices);

module.exports = router;
