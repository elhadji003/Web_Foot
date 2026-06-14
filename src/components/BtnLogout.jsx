import React from "react";

export default function ButtonLogout({ handleLogout, isLoading }) {
  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 md:px-4 rounded-xl text-sm font-semibold border border-red-200 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
    >
      {isLoading ? (
        <>
          {/* Spinner de chargement SVG */}
          <svg
            className="animate-spin h-4 w-4 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="hidden sm:inline">Déconnexion...</span>
        </>
      ) : (
        <>
          {/* Icône de porte de sortie */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="hidden sm:inline">Se déconnecter</span>
        </>
      )}
    </button>
  );
}
