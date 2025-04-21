const prisma = require("../config/database");
const path = require("path");
const fs = require("fs");

// 🔹 Đường dẫn đến thư mục lưu trữ video
const storagePath = path.join(__dirname, "../../storage/videos");

// 🔸 Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

/**
 * 📥 Tạo video mới và lưu file vào thư mục storage
 * @param {number} deviceId - ID của thiết bị liên quan
 * @param {object} file - File video được upload từ client
 * @returns {Promise<object>} - Trả về bản ghi video trong database
 */
const createVideo = async (deviceId, file) => {
  try {
    // 🔸 Tạo tên file mới: timestamp + tên gốc
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    const filePath = path.join(storagePath, fileName);

    // 🔸 Ghi file vào thư mục lưu trữ
    fs.writeFileSync(filePath, file.buffer);

    // 🔸 Lưu đường dẫn tương đối vào database
    const relativePath = `/storage/videos/${fileName}`;
    return prisma.Video.create({
      data: {
        deviceId: parseInt(deviceId),
        path: relativePath,
      },
    });
  } catch (error) {
    throw new Error(`Không thể tạo video: ${error.message}`);
  }
};

/**
 * 🔍 Lấy thông tin chi tiết của một video theo ID
 * @param {number} id - ID của video
 * @returns {Promise<object|null>} - Video kèm thông tin thiết bị nếu tồn tại
 */
const getVideoById = async (id) => {
  return prisma.Video.findUnique({
    where: { id: parseInt(id) },
    include: { device: true },
  });
};

/**
 * 🗑️ Xóa video theo ID (bao gồm cả file vật lý và bản ghi DB)
 * @param {number} id - ID của video
 * @returns {Promise<object>} - Video đã bị xóa
 */
const deleteVideo = async (id) => {
  try {
    // 🔸 Lấy video để xác định đường dẫn file
    const video = await prisma.Video.findUnique({
      where: { id: parseInt(id) },
    });
    if (!video) throw new Error("Video không tồn tại");

    // 🔸 Xóa file vật lý nếu tồn tại
    const filePath = path.join(__dirname, "../..", video.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // 🔸 Xóa bản ghi trong database
    return prisma.Video.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    throw new Error(`Không thể xóa video: ${error.message}`);
  }
};

/**
 * 📄 Lấy danh sách tất cả video kèm theo thiết bị liên quan
 * @returns {Promise<Array>} - Danh sách video
 */
const getAllVideos = async () => {
  return prisma.Video.findMany({
    include: { device: true },
  });
};

module.exports = {
  createVideo,
  getVideoById,
  deleteVideo,
  getAllVideos,
};
