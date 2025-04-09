import { createRoot } from "react-dom/client";

import "antd/dist/reset.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")).render(
  <ConfigProvider>
    <RouterProvider router={router} />
  </ConfigProvider>
);
