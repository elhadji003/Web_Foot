import React from "react";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  );
}
