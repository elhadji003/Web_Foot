import React, { useMemo, useState } from "react";
import { useGetReservationsQuery } from "../../backend/features/reservation/reservationApi";
import { FaCalendarAlt, FaClock, FaFutbol, FaUsers } from "react-icons/fa";

const statusConfig = {
  pending: {
    label: "En attente ⏳",
    className: "bg-amber-50 text-amber-700 border border-amber-100",
  },
  confirmed: {
    label: "Confirmée ✅",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  },
  cancelled: {
    label: "Annulée ❌",
    className: "bg-red-50 text-red-700 border border-red-100",
  },
};

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm text-center">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-slate-400 mt-1">{label}</p>
    </div>
  );
}

export default function DashboardUser() {
  const { data: reservation, isLoading, error } = useGetReservationsQuery();

  const [filter, setFilter] = useState("all");

  const reservations = useMemo(() => {
    const data = reservation?.results;
    return Array.isArray(data) ? data : [];
  }, [reservation]);

  const stats = useMemo(() => {
    return reservations.reduce(
      (acc, r) => {
        acc.total++;
        if (r.status === "confirmed") acc.confirmed++;
        else if (r.status === "pending") acc.pending++;
        else if (r.status === "cancelled") acc.cancelled++;
        return acc;
      },
      { total: 0, confirmed: 0, pending: 0, cancelled: 0 },
    );
  }, [reservations]);

  const filteredReservations = useMemo(() => {
    if (filter === "all") return reservations;
    return reservations.filter((r) => r.status === filter);
  }, [filter, reservations]);

  const formatTime = (t) => (t ? t.slice(0, 5) : "");
  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })
      : "";

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-slate-100 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-2xl border border-red-200">
        ⚠️ Impossible de charger vos réservations.
      </div>
    );
  }

  const { total, confirmed, pending, cancelled } = stats;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mes Réservations</h1>
        <p className="text-sm text-slate-400">{total} réservation(s)</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total" value={total} color="text-slate-700" />
        <StatCard
          label="Confirmées"
          value={confirmed}
          color="text-emerald-600"
        />
        <StatCard label="En attente" value={pending} color="text-amber-500" />
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "confirmed", "pending", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-xs border transition ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filteredReservations.length === 0 ? (
        <div className="text-center py-16 text-slate-400 italic">
          Aucune réservation ici.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReservations.map((res) => {
            const config = statusConfig[res.status] ?? {
              label: res.status,
              className: "bg-slate-50 text-slate-500 border border-slate-200",
            };

            const date = formatDate(res.creneau_details?.date);
            const heureDebut = formatTime(res.creneau_details?.heure_debut);
            const heureFin = formatTime(res.creneau_details?.heure_fin);

            return (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex justify-between items-center hover:shadow-md transition"
              >
                {/* Left */}
                <div className="flex-1 space-y-1">
                  <div className="flex">
                    <p className="font-semibold text-slate-800 flex items-center gap-2">
                      <FaFutbol className="text-blue-500" />
                      {res.salle_details?.nom ?? `Terrain #${res.salle}`} -{" "}
                    </p>

                    <p className="font-bold">
                      Tel: {res.salle_details.telephone}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500">
                    📍 {res.salle_details?.adresse}
                  </p>

                  <p className="text-xs text-slate-500">
                    💰 {res.salle_details?.prix} FCFA / heure
                  </p>

                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <FaCalendarAlt />
                    {date}
                  </p>

                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <FaClock />
                    {heureDebut} - {heureFin}
                  </p>

                  {res.creneau_details?.nombre_joueur && (
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      <FaUsers />
                      {res.creneau_details.nombre_joueur} joueurs
                    </p>
                  )}
                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${config.className}`}
                  >
                    {config.label}
                  </span>

                  <span className="text-[10px] text-slate-400">#{res.id}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
