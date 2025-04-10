const prisma = require("../config/database");

const createSystem = async (systemData) => {
  return prisma.System.create({
    data: {
      description: systemData.description,
      unit: systemData.unit,
    },
  });
};

const getSystemById = async (id) => {
  return prisma.System.findUnique({
    where: { id: parseInt(id) },
    include: { devices: true },
  });
};

const updateSystem = async (id, systemData) => {
  return prisma.System.update({
    where: { id: parseInt(id) },
    data: {
      description: systemData.description,
      unit: systemData.unit,
    },
  });
};

const deleteSystem = async (id) => {
  return prisma.System.delete({
    where: { id: parseInt(id) },
  });
};

const getAllSystems = async () => {
  return prisma.System.findMany({
    include: { devices: true },
  });
};

module.exports = {
  createSystem,
  getSystemById,
  updateSystem,
  deleteSystem,
  getAllSystems,
};
