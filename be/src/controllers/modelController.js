const modelService = require("../services/modelService");

const createModel = async (req, res, next) => {
  try {
    const model = await modelService.createModel(req.body);
    res.status(201).json(model);
  } catch (error) {
    next(error);
  }
};

const getModel = async (req, res, next) => {
  try {
    const model = await modelService.getModelById(req.params.id);
    if (!model) return res.status(404).json({ message: "Model not found" });
    res.json(model);
  } catch (error) {
    next(error);
  }
};

const deleteModel = async (req, res, next) => {
  try {
    await modelService.deleteModel(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getAllModels = async (req, res, next) => {
  try {
    const models = await modelService.getAllModels();
    res.json(models);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createModel,
  getModel,
  deleteModel,
  getAllModels,
};
