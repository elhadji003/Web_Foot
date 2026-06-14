import React from "react";
import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "../routes/PublicRoutes";
import { PrivateRoutes } from "../routes/PrivateRoutes";
import Layout from "../layouts/Layout"; // Importation de ton nouveau Layout
import ProtectRoutes from "./ProtectRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {PublicRoutes.map((route, i) => (
        <Route key={i} path={route.path} element={route.element} />
      ))}

      <Route
        element={
          <ProtectRoutes>
            <Layout />
          </ProtectRoutes>
        }
      >
        {PrivateRoutes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}
