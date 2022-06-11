const express = require("express");
const servicesController = require("../controllers/servicesController");

const router = express.Router();

router.post("/", servicesController.createServices);
router.get("/:hostId", servicesController.getHostServices);
router.delete("/:hostId", servicesController.deleteHostServices);
module.exports = router;
