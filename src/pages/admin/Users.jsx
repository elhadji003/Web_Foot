import React, { useState } from "react";
import {
  useAllUserQuery,
  useDeleteUserMutation,
} from "../../backend/features/user/userAPI";
import {
  FaTrashAlt,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
} from "react-icons/fa";

export default function Users() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Requête API
  const { data, isLoading, isFetching, error } = useAllUserQuery({
    page,
    search,
  });

  // Renommage de 'delete' en 'deleteUser' pour éviter le mot-clé réservé de JavaScript
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDelete = async (id, name) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${name} ?`)) {
      try {
        await deleteUser(id).unwrap();
        // Optionnel : Tu peux ajouter une notification de succès ici
      } catch (err) {
        console.error("Erreur de suppression:", err);
        alert(err?.data?.error || "Une erreur est survenue.");
      }
    }
  };

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-2xl border border-red-200">
        ⚠️ Une erreur est survenue lors de la récupération des données. Veuillez
        réessayer.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. EN-TÊTE & BARRE DE RECHERCHE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Gestion des Utilisateurs
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Total : {data?.count || 0} utilisateur(s)
          </p>
        </div>

        {/* Input de recherche stylisé */}
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher nom, prénom, email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* 2. TABLEAU DES UTILISATEURS */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Utilisateur</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Rôle</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {isLoading || isFetching ? (
                // Squelette de chargement visuel pendant les requêtes
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-full" />{" "}
                      <div className="h-4 bg-slate-200 rounded w-24" />
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 bg-slate-200 rounded w-40" />
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-6 bg-slate-200 rounded w-16" />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="h-8 bg-slate-200 rounded w-8 ml-auto" />
                    </td>
                  </tr>
                ))
              ) : data?.results?.length > 0 ? (
                data.results.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Profil / Identité */}
                    <td className="py-4 px-6 font-medium text-slate-800 flex items-center gap-3">
                      <FaUserCircle className="w-8 h-8 text-slate-300 shrink-0" />
                      <span className="truncate">
                        {user.first_name || user.username || "Sans prénom"}
                      </span>
                    </td>
                    {/* Email */}
                    <td className="py-4 px-6 text-slate-500">{user.email}</td>
                    {/* Statut / Rôle Badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.is_staff
                            ? "bg-purple-50 text-purple-700 border border-purple-100"
                            : "bg-blue-50 text-blue-700 border border-blue-100"
                        }`}
                      >
                        {user.is_staff ? "Admin" : "Membre"}
                      </span>
                    </td>
                    {/* Bouton d'action */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() =>
                          handleDelete(user.id, user.first_name || user.email)
                        }
                        disabled={isDeleting}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Supprimer l'utilisateur"
                      >
                        <FaTrashAlt className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                // Pas de données trouvées
                <tr>
                  <td
                    colSpan="4"
                    className="py-12 text-center text-slate-400 font-medium"
                  >
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 3. PAGINATION PROFESSIONNELLE */}
        {data?.count > 0 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between text-sm">
            <span className="text-slate-400 font-medium">
              Page <strong className="text-slate-700">{page}</strong>
            </span>

            <div className="flex gap-2">
              <button
                disabled={!data?.previous || isFetching}
                onClick={() => setPage((p) => p - 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 font-semibold bg-white border border-slate-200 rounded-xl text-slate-600 shadow-sm hover:bg-slate-50 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all"
              >
                <FaChevronLeft className="w-3 h-3" /> Précédent
              </button>
              <button
                disabled={!data?.next || isFetching}
                onClick={() => setPage((p) => p + 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 font-semibold bg-white border border-slate-200 rounded-xl text-slate-600 shadow-sm hover:bg-slate-50 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all"
              >
                Suivant <FaChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
