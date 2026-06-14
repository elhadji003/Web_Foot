import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";

export const PublicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];
