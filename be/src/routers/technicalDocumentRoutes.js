const express = require("express");
const router = express.Router();
const technicalDocumentController = require("../controllers/technicalDocumentController");
const multer = require("multer");

// Cấu hình multer để xử lý upload file
const upload = multer({
  storage: multer.memoryStorage(), // Lưu file vào bộ nhớ tạm thời trước khi ghi vào đĩa
  limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn kích thước file: 10MB
});

router.post(
  "/",
  upload.single("file"),
  technicalDocumentController.createDocument
);
router.delete("/:id", technicalDocumentController.deleteDocument);
router.get("/:id/view", technicalDocumentController.displayDocument); // Route tải file

module.exports = router;
