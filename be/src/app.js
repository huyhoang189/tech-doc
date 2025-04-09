const express = require("express");
const dotenv = require("dotenv");
const deviceRoutes = require("./routers/deviceRoutes");
const technicalDocumentRoutes = require("./routers/technicalDocumentRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/devices", deviceRoutes);
app.use("/api/documents", technicalDocumentRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
