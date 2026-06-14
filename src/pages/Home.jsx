import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-2">Yo 👋</h1>

      <p className="text-gray-600 mb-6">
        Bienvenue sur ton app web foot ⚽
      </p>

      <Link
        to="/login"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Se connecter
      </Link>
    </div>
  );
}