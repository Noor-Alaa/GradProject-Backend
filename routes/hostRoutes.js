const express = require("express");
const hostController = require("../controllers/hostController");
const router = express.Router();

router.post("/", hostController.createHosts);
router.get("/", hostController.getStatus);
router.patch("/:id", hostController.updateHost);
router.delete("/:id", hostController.deleteHost);
router.get("/:id", hostController.getHost);

module.exports = router;
