const videoService = require("../services/videoService");
const path = require("path");
const fs = require("fs");

/**
 * 📥 API: Upload video mới (MP4...)
 */
const createVideo = async (req, res, next) => {
  try {
    const { deviceId } = req.body;
    const file = req.file;

    if (!deviceId) {
      return res.status(400).json({ message: "Thiếu deviceId" });
    }

    if (!file) {
      return res.status(400).json({ message: "Vui lòng upload file video" });
    }

    const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return res
        .status(400)
        .json({ message: "Chỉ hỗ trợ file video định dạng MP4, WebM, OGG" });
    }

    const video = await videoService.createVideo(deviceId, file);
    res.status(201).json(video);
  } catch (error) {
    next(error);
  }
};

/**
 * 🗑️ API: Xóa video theo ID
 */
const deleteVideo = async (req, res, next) => {
  try {
    await videoService.deleteVideo(req.params.id);
    res.status(204).send(); // Không có nội dung
  } catch (error) {
    next(error);
  }
};

/**
 * 📥 API: Tải file video về
 */
const downloadVideo = async (req, res, next) => {
  try {
    const video = await videoService.getVideoById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video không tồn tại" });
    }

    const filePath = path.join(__dirname, "../..", video.path);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File không tồn tại" });
    }

    res.download(filePath, path.basename(filePath));
  } catch (error) {
    next(error);
  }
};

const streamVideoById = async (req, res, next) => {
  try {
    const video = await getVideoById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video không tồn tại" });
    }

    const filePath = path.join(__dirname, "../..", video.path);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File không tồn tại" });
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      // 🎬 Hỗ trợ stream theo đoạn (partial content)
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4", // hoặc xét theo đuôi file
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      // 🎥 Trả toàn bộ file nếu không có yêu cầu range
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVideo,
  deleteVideo,
  downloadVideo,
  streamVideoById,
};
