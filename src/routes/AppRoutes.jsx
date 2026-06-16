import React from "react";
import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "../routes/PublicRoutes";
import { PrivateRoutes } from "../routes/PrivateRoutes";
import { UserRoutes } from "./UserRoutes";
import Layout from "../layouts/Layout";
import ProtectRoutes from "./ProtectRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ✅ Routes publiques */}
      {PublicRoutes.map((route, i) => (
        <Route key={i} path={route.path} element={route.element} />
      ))}

      {/* ✅ Un seul bloc protégé — Layout gère le rendu selon le rôle */}
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

        {UserRoutes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}
