const prisma = require("../config/database");

const createDevice = async (deviceData) => {
  return prisma.devices.create({
    data: {
      deviceName: deviceData.deviceName,
    },
  });
};

const getDeviceById = async (id) => {
  return prisma.devices.findUnique({
    where: { id: parseInt(id) },
    include: { technical_documents: true },
  });
};

const updateDevice = async (id, deviceData) => {
  return prisma.devices.update({
    where: { id: parseInt(id) },
    data: { deviceName: deviceData.deviceName },
  });
};

const deleteDevice = async (id) => {
  return prisma.devices.delete({
    where: { id: parseInt(id) },
  });
};

const getAllDevices = async () => {
  return prisma.devices.findMany({
    include: { technical_documents: true },
  });
};

module.exports = {
  createDevice,
  getDeviceById,
  updateDevice,
  deleteDevice,
  getAllDevices,
};
