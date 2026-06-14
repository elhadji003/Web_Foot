import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINTS } from "../../../services/endpoints";
import { baseQueryWithReauth } from "../auth/baseQuery";

export const creneauApi = createApi({
  reducerPath: "creneauApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Creneau"], // Tag pour gérer le rafraîchissement automatique

  endpoints: (builder) => ({
    // 1. Récupérer tous les créneaux
    getCreneaux: builder.query({
      query: () => ENDPOINTS.creneau.list,
      providesTags: ["Creneau"],
    }),

    // 2. Créer un créneau
    createCreneau: builder.mutation({
      query: (newCreneau) => ({
        url: ENDPOINTS.creneau.create,
        method: "POST",
        body: newCreneau,
      }),
      invalidatesTags: ["Creneau"],
    }),

    // 3. Modifier un créneau (Même logique que pour la salle !)
    updateCreneau: builder.mutation({
      query: ({ id, ...body }) => ({
        url: ENDPOINTS.creneau.update(id), // Appelle la fonction fléchée de tes endpoints
        method: "PATCH", // PATCH pour les modifications partielles (heures, statut, etc.)
        body: body,
      }),
      invalidatesTags: ["Creneau"],
    }),

    // 4. Supprimer un créneau
    deleteCreneau: builder.mutation({
      query: (id) => ({
        url: ENDPOINTS.creneau.delete(id), // Appelle la fonction fléchée avec l'ID
        method: "DELETE",
      }),
      invalidatesTags: ["Creneau"],
    }),
  }),
});

export const {
  useGetCreneauxQuery,
  useCreateCreneauMutation,
  useUpdateCreneauMutation,
  useDeleteCreneauMutation,
} = creneauApi;
