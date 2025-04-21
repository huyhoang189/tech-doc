const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const deviceRoutes = require("./routers/deviceRoutes");
const modelRoutes = require("./routers/modelRoutes");
const videoRouters = require("./routers/videoRouters");
const technicalDocumentRoutes = require("./routers/technicalDocumentRoutes");
const systemController = require("./routers/systemRoutes");
const userRoutes = require("./routers/userRoutes");
const authRoutes = require("./routers/authRouters");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

app.use(express.json());

app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/systems", systemController);
app.use("/api/devices", deviceRoutes);
app.use("/api/models", modelRoutes);
app.use("/api/videos", videoRouters);
app.use("/api/documents", technicalDocumentRoutes);
app.use("/api/users", userRoutes);

// Phục vụ file tĩnh từ thư mục storage
app.use("/storage", express.static("storage"));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
