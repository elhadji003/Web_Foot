import React, { useState } from "react";
import {
  useGetCreneauxQuery,
  useCreateCreneauMutation,
  useUpdateCreneauMutation,
  useDeleteCreneauMutation,
} from "../../backend/features/creneau/creneauApi";
import { useGetSallesQuery } from "../../backend/features/salle/salleApi";
import CreateUpdateCreneauModal from "./CreateUpdateCreneauModal";
import {
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaClock,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";

export default function CreneauxDashboard() {
  const { data: creneauxData, isLoading: loadingCreneaux } =
    useGetCreneauxQuery();
  const { data: sallesData } = useGetSallesQuery();

  const [createCreneau, { isLoading: isCreating }] = useCreateCreneauMutation();
  const [updateCreneau, { isLoading: isUpdating }] = useUpdateCreneauMutation();
  const [deleteCreneau] = useDeleteCreneauMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCreneau, setSelectedCreneau] = useState(null);

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedCreneau) {
        await updateCreneau({ id: selectedCreneau.id, ...formData }).unwrap();
      } else {
        await createCreneau(formData).unwrap();
      }
      setIsModalOpen(false);
      setSelectedCreneau(null);
    } catch (err) {
      console.error("Erreur de soumission :", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous supprimer ce créneau horaire ?")) {
      try {
        await deleteCreneau(id).unwrap();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Planning & Créneaux
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Ouvrez des plages de jeu pour les joueurs
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCreneau(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all"
        >
          <FaPlus className="w-3 h-3" /> Planifier un match
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Plage Horaire</th>
                <th className="py-4 px-6">Capacité</th>
                <th className="py-4 px-6">Statut</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {loadingCreneaux ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="6" className="py-4 px-6">
                      <div className="h-4 bg-slate-100 rounded w-full" />
                    </td>
                  </tr>
                ))
              ) : creneauxData?.results?.length > 0 ? (
                creneauxData.results.map((creneau) => (
                  <tr
                    key={creneau.id}
                    className="hover:bg-slate-50/40 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">
                      #{creneau.id}
                    </td>

                    {/* Date au format FR */}
                    <td className="py-4 px-6 font-semibold text-slate-700 flex items-center gap-2">
                      <FaCalendarAlt className="text-slate-400 w-3.5 h-3.5" />
                      {new Date(creneau.date).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>

                    {/* Horaires */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg text-xs">
                        <FaClock className="text-slate-400" />
                        {creneau.heure_debut?.substring(0, 5)} -{" "}
                        {creneau.heure_fin?.substring(0, 5)}
                      </span>
                    </td>

                    {/* Nombre de Joueurs */}
                    <td className="py-4 px-6 font-medium text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <FaUsers className="text-slate-400" />{" "}
                        {creneau.nombre_joueur} joueurs
                      </span>
                    </td>

                    {/* Statut (is_active) */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          creneau.is_active
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {creneau.is_active ? "Actif / Dispo" : "Masqué"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-1">
                      <button
                        onClick={() => {
                          setSelectedCreneau(creneau);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(creneau.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <FaTrashAlt className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-slate-400 italic font-medium"
                  >
                    Aucun match ni créneau planifié pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateUpdateCreneauModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCreneau(null);
        }}
        onSubmit={handleFormSubmit}
        creneauToEdit={selectedCreneau}
        salles={sallesData?.results}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
}
