const prisma = require("../config/database");

const createDocument = async (documentData) => {
  return prisma.technical_documents.create({
    data: {
      deviceId: parseInt(documentData.deviceId),
      documentName: documentData.documentName,
      filePath: documentData.filePath,
    },
  });
};

const getDocumentById = async (id) => {
  return prisma.technical_documents.findUnique({
    where: { id: parseInt(id) },
    include: { device: true },
  });
};

const updateDocument = async (id, documentData) => {
  return prisma.technical_documents.update({
    where: { id: parseInt(id) },
    data: {
      documentName: documentData.documentName,
      filePath: documentData.filePath,
      deviceId: documentData.deviceId
        ? parseInt(documentData.deviceId)
        : undefined,
    },
  });
};

const deleteDocument = async (id) => {
  return prisma.technical_documents.delete({
    where: { id: parseInt(id) },
  });
};

const getAllDocuments = async () => {
  return prisma.technical_documents.findMany({
    include: { devices: true },
  });
};

module.exports = {
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
  getAllDocuments,
};
