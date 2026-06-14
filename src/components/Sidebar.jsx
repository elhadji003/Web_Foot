import React from "react";
import { FaChartPie, FaUser, FaLayerGroup, FaTimes, FaRegUser } from "react-icons/fa"; // Changement et ajout d'icônes
import { Link, useLocation } from "react-router-dom"; // Utile pour détecter la page active

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  // Petite fonction pour donner un style "actif" au lien de la page où l'on se trouve
  const linkClass = (path) => {
    const baseStyle =
      "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200";
    return location.pathname === path
      ? `${baseStyle} bg-blue-600 text-white shadow-lg shadow-blue-600/10`
      : `${baseStyle} text-slate-400 hover:bg-slate-800/60 hover:text-slate-200`;
  };

  return (
    <>
      {/* 1. OVERLAY (Arrière-plan sombre sur mobile quand la sidebar est ouverte) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/40 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 2. SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-200 flex flex-col justify-between p-4
          transform transition-transform duration-300 ease-in-out
          md:static md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div>
          {/* Logo + Bouton Fermer (visible UNIQUEMENT sur mobile) */}
          <div className="flex items-center justify-between px-2 py-3 mb-8 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
                A
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                AdminPanel
              </span>
            </div>

            {/* Bouton fermer sur Mobile (Remplacé par FaTimes pour faire une croix) */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white md:hidden transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5">
            <Link
              to="/dashboard"
              className={linkClass("/dashboard")}
              onClick={() => setIsOpen(false)}
            >
              <FaChartPie className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/users"
              className={linkClass("/users")}
              onClick={() => setIsOpen(false)}
            >
              <FaUser className="w-5 h-5" />
              <span>Users</span>
            </Link>

            <Link
              to="/terrains"
              className={linkClass("/terrains")}
              onClick={() => setIsOpen(false)}
            >
              <FaLayerGroup className="w-5 h-5" />
              <span>Terrains</span>
            </Link>
            <Link
              to="/reservation"
              className={linkClass("/reservation")}
              onClick={() => setIsOpen(false)}
            >
              <FaRegUser className="w-5 h-5" />
              <span>Reservations</span>
            </Link>
          </nav>
        </div>

        <div className="text-xs text-slate-500 px-3 py-2 border-t border-slate-800/50 pt-4">
          v1.0.0 — © 2026
        </div>
      </aside>
    </>
  );
}
