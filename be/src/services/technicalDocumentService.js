const prisma = require("../config/database");

const createDocument = async (documentData) => {
  return prisma.TechnicalDocument.create({
    data: {
      deviceId: parseInt(documentData.deviceId),
      path: documentData.path, // Chỉ cần path
    },
  });
};

const getDocumentById = async (id) => {
  return prisma.TechnicalDocument.findUnique({
    where: { id: parseInt(id) },
    include: { device: true },
  });
};

const deleteDocument = async (id) => {
  return prisma.TechnicalDocument.delete({
    where: { id: parseInt(id) },
  });
};

const getAllDocuments = async () => {
  return prisma.TechnicalDocument.findMany({
    include: { device: true },
  });
};

module.exports = {
  createDocument,
  getDocumentById,
  deleteDocument,
  getAllDocuments,
};
