import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminDashboard />,
  },
]);
