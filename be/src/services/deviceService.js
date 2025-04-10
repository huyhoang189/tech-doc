const prisma = require("../config/database");

const createDevice = async (deviceData) => {
  console.log(deviceData);
  return prisma.Device.create({
    data: {
      deviceName: deviceData.deviceName,
    },
  });
};

const getDeviceById = async (id) => {
  return prisma.Device.findUnique({
    where: { id: parseInt(id) },
    include: {
      documents: true,
      models: true,
    },
  });
};

const updateDevice = async (id, deviceData) => {
  return prisma.Device.update({
    where: { id: parseInt(id) },
    data: { deviceName: deviceData.deviceName },
  });
};

const deleteDevice = async (id) => {
  return prisma.Device.delete({
    where: { id: parseInt(id) },
  });
};

const getAllDevices = async () => {
  return prisma.Device.findMany({
    include: {
      documents: true,
      models: true,
    },
  });
};

module.exports = {
  createDevice,
  getDeviceById,
  updateDevice,
  deleteDevice,
  getAllDevices,
};
