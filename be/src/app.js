const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const deviceRoutes = require("./routers/deviceRoutes");
const modelRoutes = require("./routers/modelRoutes");
const technicalDocumentRoutes = require("./routers/technicalDocumentRoutes");
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
app.use("/api/devices", deviceRoutes);
app.use("/api/models", modelRoutes);
app.use("/api/documents", technicalDocumentRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
