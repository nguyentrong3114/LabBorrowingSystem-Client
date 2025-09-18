import { createBrowserRouter } from "react-router-dom";
import LabManagement from "../pages/labs/LabManagement";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/labs",
        element: <LabManagement />,
      },
    ],
  },
]);

export default router;