import { createBrowserRouter } from "react-router-dom";
import LabManagement from "../pages/labs/LabManagement";
import LabForm from "../pages/labs/LabForm";
import EquipmentManagement from "../pages/equipment/EquipmentManagement";
import EquipmentManagementWithRedux from "../pages/labs/EquipmentManagementRedux";
import EquipmentForm from "../pages/equipment/EquipmentForm";
import EquipmentDetails from "../pages/equipment/EquipmentDetails";
import EquipmentMaintenance from "../pages/equipment/EquipmentMaintenance";
import EquipmentAnalytics from "../pages/equipment/EquipmentAnalytics";
import EquipmentBooking from "../pages/equipment/EquipmentBooking";
import BookingsManagement from "../pages/bookings/BookingsManagement";
import BookingForm from "../pages/bookings/BookingForm";
import BookingDetails from "../pages/bookings/BookingDetails";
import UserManagement from "../pages/users/UserManagement";
import UserForm from "../pages/users/UserForm";
import StudentBorrowDetails from "../pages/users/StudentBorrowDetails";
import SettingsPage from "../pages/settings/SettingsPage";
import Login from "../pages/Login";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      // Lab routes
      {
        path: "/labs",
        element: <LabManagement />,
      },
      {
        path: "/labs/new",
        element: <LabForm />,
      },
      {
        path: "/labs/:id/edit",
        element: <LabForm />,
      },
      // Equipment routes
      {
        path: "/equipment",
        element: <EquipmentManagement />,
      },
      {
        path: "/equipment/new",
        element: <EquipmentForm />,
      },
      {
        path: "/equipment/:id",
        element: <EquipmentDetails />,
      },
      {
        path: "/equipment/:id/edit",
        element: <EquipmentForm />,
      },
      {
        path: "/equipment/:id/maintenance",
        element: <EquipmentMaintenance />,
      },
      {
        path: "/equipment/:id/analytics",
        element: <EquipmentAnalytics />,
      },
      {
        path: "/equipment/:id/booking",
        element: <EquipmentBooking />,
      },
      {
        path: "/equipment-redux",
        element: <EquipmentManagementWithRedux />,
      },
      // Booking routes
      {
        path: "/bookings",
        element: <BookingsManagement />,
      },
      {
        path: "/bookings/new",
        element: <BookingForm />,
      },
      {
        path: "/bookings/:id/edit",
        element: <BookingForm />,
      },
      {
        path: "/bookings/:id",
        element: <BookingDetails />,
      },
      // User routes
      {
        path: "/users",
        element: <UserManagement />,
      },
      {
        path: "/users/new",
        element: <UserForm />,
      },
      {
        path: "/users/:id/edit",
        element: <UserForm />,
      },
      {
        path: "/users/:id",
        element: <StudentBorrowDetails />,
      },
      // Settings
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

export default router;