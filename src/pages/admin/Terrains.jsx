import React, { useState } from "react";
import {
  useGetSallesQuery,
  useCreateSalleMutation,
  useUpdateSalleMutation,
} from "../../backend/features/salle/salleApi";
import CreateUpdateSalleModal from "./CreateUpdateSalleModal";
import SalleDetailDrawer from "./SalleDetailDrawer";
import { FaPlus, FaEye, FaEdit, FaCoins, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Terrains() {
  const { data: sallesData } = useGetSallesQuery();
  const [createSalle, { isLoading: isCreating }] = useCreateSalleMutation();
  const [updateSalle, { isLoading: isUpdating }] = useUpdateSalleMutation();

  // États de contrôle des modals et volets
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSalle, setSelectedSalle] = useState(null); // Utilisé pour Detail et Update

  // Soumission du formulaire (Ajout ou Modification)
  const handleFormSubmit = async (formData) => {
    try {
      if (selectedSalle) {
        // Mode modification : on injecte l'ID
        await updateSalle({ id: selectedSalle.id, ...formData }).unwrap();
      } else {
        // Mode création
        await createSalle(formData).unwrap();
      }
      setIsModalOpen(false);
      setSelectedSalle(null);
    } catch (err) {
      console.error("Erreur serveur : ", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800">Nos Terrains</h1>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setSelectedSalle(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-semibold"
          >
            <FaPlus /> Ajouter un terain
          </button>
          <Link
            to={"/crenau"}
            className="flex items-center gap-2 bg-gray-100 text-black px-4 py-2.5 rounded-xl font-semibold"
          >
            <FaPlus /> Ajouter un creneau
          </Link>
        </div>
      </div>

      {/* Grille de rendering des cartes complexes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sallesData?.results?.map((terrain) => (
          <div
            key={terrain.id}
            className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-xs"
          >
            <div>
              <h3 className="font-bold text-slate-800 text-lg">
                {terrain.nom}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <FaMapMarkerAlt /> {terrain.adresse}
              </p>
              <p className="text-sm font-bold text-blue-600 mt-2">
                {parseFloat(terrain.prix).toLocaleString()} FCFA / h
              </p>
            </div>

            {/* Actions de la carte */}
            <div className="flex gap-2 mt-4 border-t border-slate-50 pt-3">
              <button
                onClick={() => {
                  setSelectedSalle(terrain);
                  setIsDrawerOpen(true);
                }}
                className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold bg-slate-50 text-slate-600 py-2 rounded-lg hover:bg-slate-100"
              >
                <FaEye /> Détails
              </button>
              <button
                onClick={() => {
                  setSelectedSalle(terrain);
                  setIsModalOpen(true);
                }}
                className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100"
              >
                <FaEdit /> Modifier
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Injection des composants secondaires modulaires */}
      <CreateUpdateSalleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        salleToEdit={selectedSalle}
        isLoading={isCreating || isUpdating}
      />

      <SalleDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        salle={selectedSalle}
      />
    </div>
  );
}
