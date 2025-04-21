const prisma = require("../config/database");
const path = require("path");
const fs = require("fs");

// 🔹 Đường dẫn đến thư mục lưu trữ mô hình 3D
const storagePath = path.join(__dirname, "../../storage/models");

// 🔸 Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

/**
 * 📥 Tạo mô hình 3D mới và lưu file vào thư mục storage
 * @param {number} deviceId - ID của thiết bị liên quan
 * @param {object} file - File mô hình (.glb) được upload từ client
 * @returns {Promise<object>} - Trả về bản ghi mô hình trong database
 */
const createModel = async (deviceId, file) => {
  try {
    // 🔸 Tạo tên file mới: timestamp + tên gốc
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    const filePath = path.join(storagePath, fileName);

    // 🔸 Ghi file vào thư mục lưu trữ
    fs.writeFileSync(filePath, file.buffer);

    // 🔸 Lưu đường dẫn tương đối vào database
    const relativePath = `/storage/models/${fileName}`;
    return prisma.Model.create({
      data: {
        deviceId: parseInt(deviceId),
        path: relativePath,
      },
    });
  } catch (error) {
    throw new Error(`Không thể tạo mô hình 3D: ${error.message}`);
  }
};

/**
 * 🔍 Lấy thông tin chi tiết của một mô hình theo ID
 * @param {number} id - ID của mô hình
 * @returns {Promise<object|null>} - Mô hình kèm thông tin thiết bị nếu tồn tại
 */
const getModelById = async (id) => {
  return prisma.Model.findUnique({
    where: { id: parseInt(id) },
    include: { device: true },
  });
};

/**
 * 🗑️ Xóa mô hình theo ID (bao gồm cả file vật lý và bản ghi DB)
 * @param {number} id - ID của mô hình
 * @returns {Promise<object>} - Mô hình đã bị xóa
 */
const deleteModel = async (id) => {
  try {
    // 🔸 Lấy mô hình để xác định đường dẫn file
    const model = await prisma.Model.findUnique({
      where: { id: parseInt(id) },
    });
    if (!model) throw new Error("Mô hình không tồn tại");

    // 🔸 Xóa file vật lý nếu tồn tại
    const filePath = path.join(__dirname, "../..", model.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // 🔸 Xóa bản ghi trong database
    return prisma.Model.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    throw new Error(`Không thể xóa mô hình: ${error.message}`);
  }
};

/**
 * 📄 Lấy danh sách tất cả mô hình kèm theo thiết bị liên quan
 * @returns {Promise<Array>} - Danh sách mô hình
 */
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
