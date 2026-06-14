import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes, FaCoins, FaMapMarkerAlt, FaPhoneAlt, FaBuilding } from "react-icons/fa";

export default function CreateUpdateSalleModal({ isOpen, onClose, onSubmit, salleToEdit, isLoading }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Reset le formulaire à chaque fois qu'on ouvre/change de salle à modifier
  useEffect(() => {
    if (salleToEdit) {
      reset({
        nom: salleToEdit.nom,
        adresse: salleToEdit.adresse,
        telephone: salleToEdit.telephone,
        prix: salleToEdit.prix,
        latitude: salleToEdit.latitude,
        longitude: salleToEdit.longitude,
      });
    } else {
      reset({ nom: "", adresse: "", telephone: "", prix: "", latitude: "", longitude: "" });
    }
  }, [salleToEdit, isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay sombre arrière-plan */}
      <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />

      {/* Contenu de la Modal */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg z-10 overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* En-tête */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">
            {salleToEdit ? "Modifier le complexe" : "Ajouter un nouveau complexe"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          
          {/* Nom */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Nom du terrain / complexe</label>
            <div className="relative">
              <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Ex: Complexe EDK"
                {...register("nom", { required: "Le nom est obligatoire" })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
              />
            </div>
            {errors.nom && <p className="text-red-500 text-xs mt-1">⚠️ {errors.nom.message}</p>}
          </div>

          {/* Adresse */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Adresse</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Ex: Grand Standing, Thiès"
                {...register("adresse", { required: "L'adresse est obligatoire" })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
              />
            </div>
            {errors.adresse && <p className="text-red-500 text-xs mt-1">⚠️ {errors.adresse.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Téléphone */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Téléphone</label>
              <div className="relative">
                <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="78 000 00 00"
                  {...register("telephone", { required: "Téléphone obligatoire" })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                />
              </div>
              {errors.telephone && <p className="text-red-500 text-xs mt-1">⚠️ {errors.telephone.message}</p>}
            </div>

            {/* Prix */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Prix (FCFA / heure)</label>
              <div className="relative">
                <FaCoins className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  placeholder="15000"
                  {...register("prix", { required: "Le prix est obligatoire" })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                />
              </div>
              {errors.prix && <p className="text-red-500 text-xs mt-1">⚠️ {errors.prix.message}</p>}
            </div>
          </div>

          {/* Coordonnées GPS GPS (Optionnels) */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Latitude (Optionnel)</label>
              <input
                type="text"
                placeholder="14.7782"
                {...register("latitude")}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Longitude (Optionnel)</label>
              <input
                type="text"
                placeholder="-16.9500"
                {...register("longitude")}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Actions boutons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/10 hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all"
            >
              {isLoading ? "Envoi..." : salleToEdit ? "Sauvegarder" : "Créer le complexe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}