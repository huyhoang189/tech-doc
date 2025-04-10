const deviceService = require("../services/deviceService");

const createDevice = async (req, res, next) => {
  try {
    const device = await deviceService.createDevice(req.body);
    res.status(201).json(device);
  } catch (error) {
    next(error);
  }
};

const getDevice = async (req, res, next) => {
  try {
    const device = await deviceService.getDeviceById(req.params.id);
    if (!device) return res.status(404).json({ message: "Device not found" });
    res.json(device);
  } catch (error) {
    next(error);
  }
};

const updateDevice = async (req, res, next) => {
  try {
    const device = await deviceService.updateDevice(req.params.id, req.body);
    res.json(device);
  } catch (error) {
    next(error);
  }
};

const deleteDevice = async (req, res, next) => {
  try {
    await deviceService.deleteDevice(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getAllDevices = async (req, res, next) => {
  try {
    const systemId = req.query.systemId ? parseInt(req.query.systemId) : null;
    const devices = await deviceService.getDevices(systemId);
    res.json(devices);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDevice,
  getDevice,
  updateDevice,
  deleteDevice,
  getAllDevices,
};
