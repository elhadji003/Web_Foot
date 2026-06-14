import CreneauxDashboard from "../pages/admin/CreneauxDashboard";
import DashbordAdmin from "../pages/admin/DashbordAdmin";
import ReservationsDashboard from "../pages/admin/ReservationsDashboard";
import Terrains from "../pages/admin/Terrains";
import Users from "../pages/admin/Users";

export const PrivateRoutes = [
  { path: "/dashboard", element: <DashbordAdmin /> },
  { path: "/users", element: <Users /> },
  { path: "/terrains", element: <Terrains /> },
  { path: "/crenau", element: <CreneauxDashboard /> },
  { path: "/reservation", element: <ReservationsDashboard /> },
];
