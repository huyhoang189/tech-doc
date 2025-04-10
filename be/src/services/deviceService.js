const prisma = require("../config/database");

const getDevices = async (systemId) => {
  try {
    const where = systemId ? { systemId: parseInt(systemId) } : {};
    return prisma.device.findMany({
      where,
      include: {
        documents: true,
        models: true,
      },
    });
  } catch (error) {
    throw new Error(`Không thể lấy danh sách thiết bị: ${error.message}`);
  }
};

const getDeviceById = async (id) => {
  try {
    return prisma.device.findUnique({
      where: { id: parseInt(id) },
      include: {
        documents: true,
        models: true,
      },
    });
  } catch (error) {
    throw new Error(`Không thể lấy thiết bị: ${error.message}`);
  }
};

const createDevice = async (deviceData) => {
  try {
    return prisma.device.create({
      data: {
        deviceName: deviceData.deviceName,
        systemId: parseInt(deviceData.systemId), // Đảm bảo gán systemId
      },
    });
  } catch (error) {
    throw new Error(`Không thể tạo thiết bị: ${error.message}`);
  }
};

const updateDevice = async (id, deviceData) => {
  try {
    return prisma.device.update({
      where: { id: parseInt(id) },
      data: { deviceName: deviceData.deviceName },
    });
  } catch (error) {
    throw new Error(`Không thể cập nhật thiết bị: ${error.message}`);
  }
};

const deleteDevice = async (id) => {
  try {
    return prisma.device.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    throw new Error(`Không thể xóa thiết bị: ${error.message}`);
  }
};

module.exports = {
  getDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
};
