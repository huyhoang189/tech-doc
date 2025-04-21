const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const videoController = require("../controllers/videoController");

router.post("/", upload.single("file"), videoController.createVideo);
router.delete("/:id", videoController.deleteVideo);
router.get("/download/:id", videoController.downloadVideo);
router.get("/view/:id", videoController.streamVideoById); // new route
module.exports = router;
