const prisma = require("../config/database");
const path = require("path");
const fs = require("fs");

// Đường dẫn đến thư mục lưu trữ
const storagePath = path.join(__dirname, "../../storage/documents");

// Đảm bảo thư mục storage/documents tồn tại
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

const createDocument = async (deviceId, file) => {
  try {
    // Định dạng tên file: timestamp + tên gốc
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    const filePath = path.join(storagePath, fileName);

    // Lưu file vào thư mục storage
    fs.writeFileSync(filePath, file.buffer);

    // Lưu đường dẫn tương đối vào database
    const relativePath = `/storage/documents/${fileName}`;
    return prisma.TechnicalDocument.create({
      data: {
        deviceId: parseInt(deviceId),
        path: relativePath,
      },
    });
  } catch (error) {
    throw new Error(`Không thể tạo tài liệu kỹ thuật: ${error.message}`);
  }
};

const getDocumentById = async (id) => {
  return prisma.TechnicalDocument.findUnique({
    where: { id: parseInt(id) },
    include: { device: true },
  });
};

const deleteDocument = async (id) => {
  try {
    // Lấy thông tin tài liệu để xóa file
    const document = await prisma.TechnicalDocument.findUnique({
      where: { id: parseInt(id) },
    });
    if (!document) throw new Error("Tài liệu không tồn tại");

    // Xóa file từ thư mục storage
    const filePath = path.join(__dirname, "../..", document.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Xóa bản ghi trong database
    return prisma.TechnicalDocument.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    throw new Error(`Không thể xóa tài liệu kỹ thuật: ${error.message}`);
  }
};

const getAllDocuments = async () => {
  return prisma.TechnicalDocument.findMany({
    include: { device: true },
  });
};

module.exports = {
  createDocument,
  getDocumentById,
  deleteDocument,
  getAllDocuments,
};
