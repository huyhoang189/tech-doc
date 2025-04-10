const prisma = require("../config/database");

const createModel = async (modelData) => {
  return prisma.Model.create({
    data: {
      deviceId: parseInt(modelData.deviceId),
      path: modelData.path,
    },
  });
};

const getModelById = async (id) => {
  return prisma.Model.findUnique({
    where: { id: parseInt(id) },
    include: { device: true },
  });
};

const deleteModel = async (id) => {
  return prisma.Model.delete({
    where: { id: parseInt(id) },
  });
};

const getAllModels = async () => {
  return prisma.Model.findMany({
    include: { device: true },
  });
};

module.exports = {
  createModel,
  getModelById,
  deleteModel,
  getAllModels,
};
