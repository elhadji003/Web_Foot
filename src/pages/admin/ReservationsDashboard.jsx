import React, { useState } from "react";
import {
  useGetReservationsQuery,
  useUpdateReservationMutation,
} from "../../backend/features/reservation/reservationApi";
import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaFutbol,
} from "react-icons/fa";

export default function ReservationsDashboard() {
  const { data: resData, isLoading, error } = useGetReservationsQuery();
  const [updateReservation] = useUpdateReservationMutation();
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateReservation({ id, status: newStatus }).unwrap();
      if (newStatus === "confirmed") {
        showToast("Réservation confirmée avec succès.", "success");
      } else if (newStatus === "cancelled") {
        showToast("Réservation annulée — créneau remis disponible.", "error");
      }
    } catch (err) {
      console.error("Erreur de mise à jour du statut:", err);
      showToast("Une erreur est survenue.", "error");
    }
  };

  // Correspondance statut → badge
  const statusConfig = {
    pending: {
      label: "En attente",
      className: "bg-amber-50 text-amber-700 border border-amber-100",
    },
    confirmed: {
      label: "Confirmée",
      className: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    },
    cancelled: {
      label: "Annulée",
      className: "bg-red-50 text-red-700 border border-red-100",
    },
  };

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-2xl border border-red-200">
        ⚠️ Impossible de charger les réservations. Vérifiez vos accès.
      </div>
    );
  }

  const allResults = resData?.results ?? [];

  const filteredResults =
    filterStatus === "all"
      ? allResults
      : allResults.filter((r) => r.status === filterStatus);

  return (
    <div className="space-y-6 relative">
      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg transition-all ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Suivi des Réservations
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {filteredResults.length} demande(s) enregistrée(s)
          </p>
        </div>

        {/* Filtre par statut */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmée</option>
          <option value="cancelled">Annulée</option>
        </select>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Client</th>
                <th className="py-4 px-6">Terrain / Complexe</th>
                <th className="py-4 px-6">Date & Plage Horaire</th>
                <th className="py-4 px-6">Statut</th>
                <th className="py-4 px-6 text-right">Actions rapides</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {isLoading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="5" className="py-5 px-6">
                      <div className="h-4 bg-slate-100 rounded w-full" />
                    </td>
                  </tr>
                ))
              ) : filteredResults.length > 0 ? (
                filteredResults.map((res) => {
                  const config = statusConfig[res.status] ?? {
                    label: res.status,
                    className:
                      "bg-slate-50 text-slate-600 border border-slate-200",
                  };

                  return (
                    <tr
                      key={res.id}
                      className="hover:bg-slate-50/40 transition-colors"
                    >
                      {/* Client */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                            {res.client_name?.substring(0, 2) ||
                              (res.user &&
                                String(res.user).substring(0, 2)) || <FaUser />}
                          </div>
                          <span className="font-medium text-slate-800">
                            {res.client_name ||
                              res.user ||
                              `Réservation #${res.id}`}
                          </span>
                        </div>
                      </td>

                      {/* Terrain */}
                      <td className="py-4 px-6 font-medium text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <FaFutbol className="text-slate-400" />
                          {res.salle_name || `Terrain #${res.salle}`}
                        </span>
                      </td>

                      {/* Date & Horaire */}
                      <td className="py-4 px-6">
                        {res.creneau_details ? (
                          <div className="space-y-1">
                            <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                              <FaCalendarAlt className="text-slate-400" />
                              {new Date(
                                res.creneau_details.date,
                              ).toLocaleDateString("fr-FR")}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                              <FaClock className="text-slate-400 w-3" />
                              {res.creneau_details.heure_debut?.substring(
                                0,
                                5,
                              )}{" "}
                              - {res.creneau_details.heure_fin?.substring(0, 5)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-red-400 italic">
                            Créneau introuvable
                          </span>
                        )}
                      </td>

                      {/* Badge statut */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.className}`}
                        >
                          {config.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-1">
                        {res.status === "pending" ? (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(res.id, "confirmed")
                              }
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Confirmer la réservation"
                            >
                              <FaCheckCircle className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(res.id, "cancelled")
                              }
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Annuler la réservation"
                            >
                              <FaTimesCircle className="w-5 h-5" />
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-slate-400 italic mr-2">
                            Aucune action requise
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center text-slate-400 font-medium italic"
                  >
                    Aucune réservation enregistrée pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
