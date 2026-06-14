import React from "react";
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

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Correction ici : on envoie le champ "status" et non "statut"
      await updateReservation({ id, status: newStatus }).unwrap();
    } catch (err) {
      console.error("Erreur de mise à jour du statut:", err);
    }
  };

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-2xl border border-red-200">
        ⚠️ Impossible de charger les réservations. Vérifiez vos accès.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Suivi des Réservations
        </h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Total : {resData?.count || resData?.results?.length || 0} demande(s)
          enregistrée(s)
        </p>
      </div>

      {/* Tableau complet */}
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
              ) : resData?.results?.length > 0 ? (
                resData.results.map((res) => (
                  <tr
                    key={res.id}
                    className="hover:bg-slate-50/40 transition-colors"
                  >
                    {/* Client */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                          {res.client_name?.substring(0, 2) ||
                            (res.user && String(res.user).substring(0, 2)) || (
                              <FaUser />
                            )}
                        </div>
                        <span className="font-medium text-slate-800">
                          {res.client_name ||
                            res.user ||
                            `Réservation #${res.id}`}
                        </span>
                      </div>
                    </td>

                    {/* Terrain lié */}
                    <td className="py-4 px-6 font-medium text-slate-700">
                      <span className="flex items-center gap-1.5">
                        <FaFutbol className="text-slate-400" />{" "}
                        {res.salle_name || `Terrain #${res.salle}`}
                      </span>
                    </td>

                    {/* Date et Plage horaire du créneau */}
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
                            )} -{" "}
                            {res.creneau_details.heure_fin?.substring(0, 5)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-red-400 italic">
                          Créneau introuvable
                        </span>
                      )}
                    </td>

                    {/* Badge de statut unique (Corrigé avec res.status) */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          res.status === "CONFIRME" || res.status === "PAYE"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : res.status === "ANNULE"
                              ? "bg-red-50 text-red-700 border border-red-100"
                              : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}
                      >
                        {res.status || "En attente"}
                      </span>
                    </td>

                    {/* Actions de validation / annulation */}
                    <td className="py-4 px-6 text-right space-x-1">
                      {res.status !== "CONFIRME" &&
                      res.status !== "ANNULE" &&
                      res.status !== "PAYE" ? (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(res.id, "CONFIRME")
                            }
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Accepter la réservation"
                          >
                            <FaCheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(res.id, "ANNULE")}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Refuser la réservation"
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
                ))
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
