const systemService = require("../services/systemService");

const createSystem = async (req, res, next) => {
  try {
    const system = await systemService.createSystem(req.body);
    res.status(201).json(system);
  } catch (error) {
    next(error);
  }
};

const getSystem = async (req, res, next) => {
  try {
    const system = await systemService.getSystemById(req.params.id);
    if (!system) return res.status(404).json({ message: "System not found" });
    res.json(system);
  } catch (error) {
    next(error);
  }
};

const updateSystem = async (req, res, next) => {
  try {
    const system = await systemService.updateSystem(req.params.id, req.body);
    res.json(system);
  } catch (error) {
    next(error);
  }
};

const deleteSystem = async (req, res, next) => {
  try {
    await systemService.deleteSystem(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getAllSystems = async (req, res, next) => {
  try {
    const systems = await systemService.getAllSystems();
    res.json(systems);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSystem,
  getSystem,
  updateSystem,
  deleteSystem,
  getAllSystems,
};
