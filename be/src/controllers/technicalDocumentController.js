const technicalDocumentService = require("../services/technicalDocumentService");
const path = require("path");
const fs = require("fs");

const createDocument = async (req, res, next) => {
  try {
    const { deviceId } = req.body;
    const file = req.file;

    if (!deviceId) {
      return res.status(400).json({ message: "Thiếu deviceId" });
    }
    if (!file) {
      return res.status(400).json({ message: "Vui lòng upload file PDF" });
    }
    if (!file.mimetype.includes("pdf")) {
      return res.status(400).json({ message: "Chỉ hỗ trợ file PDF" });
    }

    const document = await technicalDocumentService.createDocument(
      deviceId,
      file
    );
    res.status(201).json(document);
  } catch (error) {
    next(error);
  }
};

const deleteDocument = async (req, res, next) => {
  try {
    await technicalDocumentService.deleteDocument(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// API để tải file về
const downloadDocument = async (req, res, next) => {
  try {
    const document = await technicalDocumentService.getDocumentById(
      req.params.id
    );
    if (!document) {
      return res.status(404).json({ message: "Tài liệu không tồn tại" });
    }

    const filePath = path.join(__dirname, "../..", document.path);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File không tồn tại" });
    }

    res.download(filePath, path.basename(filePath));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDocument,
  deleteDocument,
  downloadDocument,
};
