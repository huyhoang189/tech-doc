const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const modelController = require("../controllers/modelController");

router.post("/", upload.single("file"), modelController.createModel);
router.delete("/:id", modelController.deleteModel);
router.get("/download/:id", modelController.downloadModel);

module.exports = router;
