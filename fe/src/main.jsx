import { createRoot } from "react-dom/client";

import "antd/dist/reset.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { ConfigProvider, theme } from "antd";

createRoot(document.getElementById("root")).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#0D47A1", // Custom primary color
        colorLink: "#0D47A1",
      },
      components: {
        Menu: {
          colorItemBgSelected: "#0D47A1",
          colorItemTextSelected: "#fff",
        },
      },
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
);
