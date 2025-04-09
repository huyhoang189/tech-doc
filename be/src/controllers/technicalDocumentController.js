const technicalDocumentService = require("../services/technicalDocumentService");

const createDocument = async (req, res, next) => {
  try {
    const document = await technicalDocumentService.createDocument(req.body);
    res.status(201).json(document);
  } catch (error) {
    next(error);
  }
};

const getDocument = async (req, res, next) => {
  try {
    const document = await technicalDocumentService.getDocumentById(
      req.params.id
    );
    if (!document)
      return res.status(404).json({ message: "Document not found" });
    res.json(document);
  } catch (error) {
    next(error);
  }
};

const updateDocument = async (req, res, next) => {
  try {
    const document = await technicalDocumentService.updateDocument(
      req.params.id,
      req.body
    );
    res.json(document);
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

const getAllDocuments = async (req, res, next) => {
  try {
    const documents = await technicalDocumentService.getAllDocuments();
    res.json(documents);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  getAllDocuments,
};
