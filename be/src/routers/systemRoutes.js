const express = require("express");
const router = express.Router();
const systemController = require("../controllers/systemController");

router.post("/", systemController.createSystem);
router.get("/", systemController.getAllSystems);
router.get("/:id", systemController.getSystem);
router.put("/:id", systemController.updateSystem);
router.delete("/:id", systemController.deleteSystem);

module.exports = router;
