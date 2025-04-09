const express = require("express");
const router = express.Router();
const technicalDocumentController = require("../controllers/technicalDocumentController");

router.post("/", technicalDocumentController.createDocument);
router.get("/", technicalDocumentController.getAllDocuments);
router.get("/:id", technicalDocumentController.getDocument);
router.put("/:id", technicalDocumentController.updateDocument);
router.delete("/:id", technicalDocumentController.deleteDocument);

module.exports = router;
