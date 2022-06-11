const express = require("express");
const InterfaceAddressesController = require("../controllers/InterfaceAddressesController");

const router = express.Router();

router.post("/", InterfaceAddressesController.createInstalledSoftware);
router.get("/:hostId", InterfaceAddressesController.getHostInstalledSoftware);
router.delete(
  "/:hostId",
  InterfaceAddressesController.deleteHostInstalledSoftware
);
module.exports = router;
