import React from "react";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserShield,
  FaCoins,
  FaCalendarCheck,
  FaClock,
  FaCalendar,
  FaUsers,
} from "react-icons/fa";

export default function SalleDetailDrawer({ isOpen, onClose, salle }) {
  if (!isOpen || !salle) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fond sombre translucide */}
      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Tiroir */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Détails de l'infrastructure
              </span>
              <h2 className="text-2xl font-bold tracking-tight mt-0.5">
                {salle.nom}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Corps des informations */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Prix majeur */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
              <span className="text-sm text-slate-500 font-medium">
                Tarif horaire appliqué :
              </span>
              <span className="text-xl font-extrabold text-blue-700 flex items-center gap-1.5">
                <FaCoins className="text-amber-500 w-5 h-5" />
                {parseFloat(salle.prix).toLocaleString()} FCFA
              </span>
            </div>

            {/* Fiche Technique */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Informations Générales
              </h3>

              <div className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400">
                      Emplacement :
                    </span>
                    <span className="font-medium text-slate-800">
                      {salle.adresse}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaPhoneAlt className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400">
                      Contact téléphonique :
                    </span>
                    <span className="font-semibold text-slate-800">
                      {salle.telephone}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaUserShield className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400">
                      Gérant responsable :
                    </span>
                    <span className="font-medium text-slate-800">
                      {salle.admin}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Créneaux (Mapping dynamique depuis ton JSON) */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <FaCalendarCheck /> Créneaux Horaires (
                {salle.creneaux?.length || 0})
              </h3>

              {salle.creneaux?.length > 0 ? (
                <div className="space-y-2">
                  {salle.creneaux.map((creneau, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 border border-slate-100 rounded-xl bg-slate-50/50 text-sm gap-2 hover:bg-slate-50 transition-colors"
                    >
                      {/* 🗓️ Jour & Date (Ex: dimanche 7 juin) */}
                      <div className="flex items-center gap-2">
                        <FaCalendar className="text-blue-500 w-3.5 h-3.5 flex-shrink-0" />
                        <span className="font-semibold text-slate-700 capitalize">
                          {creneau.date
                            ? new Date(creneau.date).toLocaleDateString(
                                "fr-FR",
                                {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                },
                              )
                            : "Date non spécifiée"}
                        </span>
                      </div>

                      {/* 🕒 Plage Horaire (Nettoyée de ses secondes) */}
                      <div className="flex items-center gap-4 justify-between sm:justify-end flex-1 sm:flex-none">
                        <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                          <FaClock className="text-blue-400" />{" "}
                          {creneau.heure_debut?.substring(0, 5)} -{" "}
                          {creneau.heure_fin?.substring(0, 5)}
                        </span>

                        {/* 👥 Nombre de joueurs max */}
                        <span
                          className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-medium flex items-center gap-1"
                          title="Nombre de joueurs maximum"
                        >
                          <FaUsers className="text-slate-400" />{" "}
                          <strong>{creneau.nombre_joueur || 10}</strong> joueurs
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic bg-slate-50 text-center py-6 rounded-2xl border border-dashed border-slate-200">
                  Aucun créneau planifié pour ce terrain actuellement.
                </p>
              )}
            </div>
          </div>

          {/* Footer du tiroir */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400">
            Créé le : {new Date(salle.created_at).toLocaleDateString("fr-FR")}
          </div>
        </div>
      </div>
    </div>
  );
}
