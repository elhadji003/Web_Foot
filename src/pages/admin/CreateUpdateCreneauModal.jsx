import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes, FaCalendarAlt, FaClock, FaDoorOpen, FaUsers } from "react-icons/fa";

export default function CreateUpdateCreneauModal({ isOpen, onClose, onSubmit, creneauToEdit, salles, isLoading }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (creneauToEdit) {
      reset({
        salle: creneauToEdit.salle,
        date: creneauToEdit.date, // Format reçu de Django: YYYY-MM-DD (parfait pour input type="date")
        nombre_joueur: creneauToEdit.nombre_joueur,
        heure_debut: creneauToEdit.heure_debut?.substring(0, 5),
        heure_fin: creneauToEdit.heure_fin?.substring(0, 5),
      });
    } else {
      reset({ salle: "", date: "", nombre_joueur: 10, heure_debut: "", heure_fin: "" });
    }
  }, [creneauToEdit, isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md z-10 overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">
            {creneauToEdit ? "Modifier le créneau" : "Planifier un créneau"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400"><FaTimes /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Sélection du Terrain */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Terrain / Salle</label>
            <div className="relative">
              <FaDoorOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                {...register("salle", { required: "Veuillez choisir un terrain" })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:bg-white focus:border-blue-500"
              >
                <option value="">Sélectionner un terrain...</option>
                {salles?.map((salle) => (
                  <option key={salle.id} value={salle.id}>{salle.nom}</option>
                ))}
              </select>
            </div>
            {errors.salle && <p className="text-red-500 text-xs mt-1">⚠️ {errors.salle.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Sélection de la Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date du match</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  {...register("date", { required: "Date requise" })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:bg-white focus:border-blue-500"
                />
              </div>
            </div>

            {/* Nombre de joueurs */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Nb. Joueurs max</label>
              <div className="relative">
                <FaUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  min="1"
                  {...register("nombre_joueur", { required: "Requis", min: 1 })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:bg-white focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Heures début & fin */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Heure Début</label>
              <div className="relative">
                <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="time"
                  {...register("heure_debut", { required: "Requis" })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Heure Fin</label>
              <div className="relative">
                <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="time"
                  {...register("heure_fin", { required: "Requis" })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-xl">
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Envoi..." : creneauToEdit ? "Mettre à jour" : "Planifier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}