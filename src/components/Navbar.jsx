import React from "react";
import ButtonLogout from "../components/BtnLogout"; // Assure-toi que le chemin d'importation est correct

export default function Navbar({ handleLogout, isLoading, toggleSidebar }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shadow-sm">
      
      {/* Partie gauche : Menu Mobile + Rôle */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 active:scale-95 transition-all md:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <span className="text-sm font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full hidden sm:inline-block">
          Rôle : Administrateur
        </span>
      </div>

      {/* Ton nouveau composant Bouton Déconnexion */}
      <ButtonLogout handleLogout={handleLogout} isLoading={isLoading} />
      
    </header>
  );
}