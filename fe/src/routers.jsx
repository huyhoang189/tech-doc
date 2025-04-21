import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import UserPage from "./pages/users";
import SystemPage from "./pages/systems";
import DevicePage from "./pages/devices";
import LoginPage from "./pages/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <SystemPage />,
      },
      {
        path: "systems",
        element: <SystemPage />,
      },
      {
        path: "systems/:id",
        element: <DevicePage />,
      },
      {
        path: "users",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);
