const model3dService = require("../services/modelService");
const path = require("path");
const fs = require("fs");

/**
 * 📥 API: Upload mô hình 3D mới (GLB...)
 */
const createModel = async (req, res, next) => {
  try {
    const { deviceId } = req.body;
    const file = req.file;

    if (!deviceId) {
      return res.status(400).json({ message: "Thiếu deviceId" });
    }

    if (!file) {
      return res
        .status(400)
        .json({ message: "Vui lòng upload file mô hình 3D" });
    }

    const allowedTypes = ["model/gltf-binary", "application/octet-stream"];
    if (
      !allowedTypes.includes(file.mimetype) &&
      !file.originalname.endsWith(".glb")
    ) {
      return res.status(400).json({ message: "Chỉ hỗ trợ file GLB" });
    }

    const model = await model3dService.createModel(deviceId, file);
    res.status(201).json(model);
  } catch (error) {
    next(error);
  }
};

/**
 * 🗑️ API: Xóa mô hình 3D theo ID
 */
const deleteModel = async (req, res, next) => {
  try {
    await model3dService.deleteModel(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

/**
 * ⬇️ API: Tải mô hình 3D về theo ID
 */
const downloadModel = async (req, res, next) => {
  try {
    const model = await model3dService.getModelById(req.params.id);
    if (!model) {
      return res.status(404).json({ message: "Mô hình không tồn tại" });
    }

    const filePath = path.join(__dirname, "../..", model.path);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File không tồn tại" });
    }

    // Trả file để FE hiển thị, KHÔNG bắt tải về
    res.setHeader("Content-Type", "model/gltf-binary");
    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createModel,
  deleteModel,
  downloadModel,
};
