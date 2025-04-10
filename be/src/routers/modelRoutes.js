const express = require("express");
const router = express.Router();
const modelController = require("../controllers/modelController");

router.post("/", modelController.createModel);
router.get("/", modelController.getAllModels);
router.get("/:id", modelController.getModel);
router.delete("/:id", modelController.deleteModel);

module.exports = router;
